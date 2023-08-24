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
3. Install dependencies using npm:
    ```
    npm install
    ```

### Configuration

Create a .env file in the root directory of the project.

Add your PayPal API credentials to the .env file:


```
CLIENT_ID="your_paypal_client_id"
APP_SECRET="your_paypal_app_secret"
```

Replace your_paypal_client_id and your_paypal_app_secret with your actual PayPal API credentials.

### Run the Project

Start the project by running:

```
node app.js
```