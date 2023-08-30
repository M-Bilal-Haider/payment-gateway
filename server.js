import "dotenv/config";
import express from "express";
import * as paypal from "./services/paypal-api.js";
import * as braintree from "./services/braintree-api.js";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json()); // Middleware to parse JSON requests



// Define routes
app.get('/', (req, res) => {
  res.render('index');
});


app.get('/paypal', async (req, res) => {
  
  try {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientToken = await paypal.generateClientToken();

    // console.log("Client ID:", clientId);
    // console.log("Client Token:", clientToken);
    res.render("paypal-checkout.ejs", { clientId, clientToken });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/braintree', (req, res) => {
  try {
    res.render("braintree-checkout.ejs");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// // render checkout page with client id & unique client token
// app.get("/", async (req, res) => {
//   const clientId = process.env.PAYPAL_CLIENT_ID;
//   try {
//     const clientToken = await paypal.generateClientToken();
//     res.render("braintree-checkout.ejs", { clientId, clientToken });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// create order
app.post("/api/orders", async (req, res) => {
  try {
    const postData = req.body;
    const amount = postData.amount;
    
    console.log("amount"+amount)
    const order = await paypal.createOrder();
    res.json(order);
    console.log("amount: " + amount);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// capture payment
app.post("/api/orders/:orderID/capture", async (req, res) => {
  const { orderID } = req.params;
  try {
    console.log("orderID"+orderID)
    const captureData = await paypal.capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});






// braintree routes

app.get('/braintree_client_token', async (req, res) => {
  try {
    const clientToken = await braintree.generateClientToken();
    // console.log("Client Token:", clientToken);
    
    res.send(clientToken);
  } catch (error) {
    // Handle error
    console.log(error)
  }
});

app.post('/braintree_checkout', async (req, res) => {
  try {
    const paymentMethodNonce = req.body.paymentMethodNonce;
    const amount = req.body.amount;

    try {
      const paymentRes = await braintree.capturePayment(paymentMethodNonce, amount);

      console.log("Payment Res:", paymentRes);

      if (paymentRes === "Payment received") {
        res.json({ success: true, message: "Payment received" });
      } else {
        res.json({ success: false, message: "Payment failed" });
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).json({ success: false, message: 'An error occurred' });
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});


app.listen(8888);