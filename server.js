
import "dotenv/config";
import express from "express";
import * as PayPal from "./services/paypal.js";
const { PORT = 8888 } = process.env;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// render checkout page with client id & unique client token
app.get("/", async (req, res) => {
  const clientId = process.env.CLIENT_ID;
  try {
    const clientToken = await PayPal.generateClientToken();
    res.render("index")
  } catch (err) {
    res.status(500).send(err.message);
  }
})

// create order
app.get("/api/orders", async (req, res) => {
  try {
    const order = await PayPal.createOrder();
    res.json(order);

    console.log(order)
  } catch (err) {

    res.status(500).send(err.message);
  }
})

// capture payment
app.get("/api/orders/:orderID/capture", async (req, res) => {
  const { orderID } = req.params; 
  try {
    const captureData = await PayPal.capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
})


// Route for form submission
app.post('/submit', (req, res) => {
  const formData = req.body;
  console.log(formData); // You can process the form data here
  res.send('Form submitted successfully!');
});


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/`);
})
    