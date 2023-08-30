import fetch from "node-fetch";
import braintree  from "braintree";





// // set some important variables
// const { CLIENT_ID, APP_SECRET } = process.env;
// const base = "https://api-m.sandbox.paypal.com";


const { BRAINTREE_MERCHANT_ID, BRAINTREE_PUBLIC_KEY, BRAINTREE_PRIVATE_KEY } = process.env;

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: BRAINTREE_MERCHANT_ID,
    publicKey: BRAINTREE_PUBLIC_KEY,
    privateKey: BRAINTREE_PRIVATE_KEY
  });
  
// capture payment for an order
export async function capturePayment(nonceFromTheClient, amount) {
    
    try {
        const result = await gateway.transaction.sale({
          amount: `${amount}`, // Amount to charge
          paymentMethodNonce: nonceFromTheClient,
          options: {
            submitForSettlement: true // Set to false if you want to authorize only
          }
        });
    
        if (result.success) {
          // Payment successful
          console.log("success")
          return "Payment received"
        } else {
            console.log("failed")
            return "Payment failed"
        }
      } catch (error) {
        // Handle error
        console.log(error)
        return "Payment failed"
      }
}

// generate client token
export async function generateClientToken() {
    return new Promise((resolve, reject) => {
      gateway.clientToken.generate({}, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.clientToken);
        }
      });
    });
  }
  
