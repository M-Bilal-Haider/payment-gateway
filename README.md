# Payment Gateway Demo Project

Welcome to the Payment Gateway Demo Project! This project demonstrates the integration of PayPal payment gateway using a REST API.

## Usage

Follow these steps to set up and run the project:

### Prerequisites

- Node.js: Make sure you have Node.js installed on your system. You can download it from the [official website](https://nodejs.org/).

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/M-Bilal-Haider/payment-gateway.git
   ```

2. Navigate to the project directory:
    ```
    cd payment-gateway
    ```

3. Place .env file at root of directory

4. Install dependencies using npm:
    ```
    npm install dotenv ejs express node-fetch braintree
    ```

### Configuration

Create a .env file in the root directory of the project.

Add your PayPal API credentials to the .env file:


```
PAYPAL_CLIENT_ID="your_paypal_client_id"
PAYPAL_APP_SECRET="your_paypal_app_secret"


BRAINTREE_MERCHANT_ID= "your_braintree_merchant_id",
BRAINTREE_PUBLIC_KEY= "your_braintree_public_key",
BRAINTREE_PRIVATE_KEY= "your_braintree_private_key"
```

Replace values with actual keys from paypal and braintree.

### Run the Project

Start the project by running:

```
node app.js
```


### Usage
Dummy braintree credit card can be taken from 
https://developer.paypal.com/braintree/docs/reference/general/testing/node


Dummy Paypal credit card is:<br />

<b>Visa</b> <br />
Card number: 4032036662035094<br />
Expiry date: 03/2028<br />
CVC code: 998<br />