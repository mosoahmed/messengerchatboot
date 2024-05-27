
# Application Setup Guide

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm.
- or You have a docker machine.
- 

## Cloning the Repository

1. Open Terminal.
2. Change the current working directory to the location where you want the cloned directory.
3. Type `git clone`, and then paste the URL of the repository.
4. Press Enter to create your local clone.

```bash
git clone https://github.com/mosoahmed/messengerchatboot.git
```

## Installing Dependencies

1. Navigate to the cloned repository's directory.
   ```bash
   cd <repository_name>
   ```
2. Install the dependencies using npm.
   ```bash
   npm install
   ```


## Generating APP_URL using ngrok

If you're running the application locally and need a public URL for webhook integrations, you can use `ngrok` to create a URL:

1. Install `ngrok` globally on your machine by running the following command in your terminal:

```bash
npm install -g ngrok
````
2.Once ngrok is installed, you can start it by running the following command, replacing <your_preferred_port> with the port number your application is running on:
```bash
ngrok http 3000
````
3.ngrok will display a public URL in the terminal. Copy the https URL (not the http one) and set it as the APP_URL in your .env file.
APP_URL=<your_ngrok_https_url>
## Setting Up Environment Variables
1.Open the `.env` file and replace the placeholder values with your actual values.

```plaintext
PAGE_ID=<your_page_id>
APP_ID=<your_app_id>
PAGE_ACCESS_TOKEN=<your_page_access_token>
APP_SECRET=<your_app_secret>
VERIFY_TOKEN=<your_verify_token>
APP_URL=<your_app_url>
SHOP_URL=<your_shop_url>
PORT=<your_preferred_port>
EMAIL_HOST=<your_email_host>
EMAIL_PORT=<your_email_port>
EMAIL_USER=<your_email_user>
EMAIL_PASS=<your_email_password>
ADMIN_EMAIL=<your_admin_email>
```

## Running the Application

Start the application using npm.

```bash
npm start
```

## How To handle high volume write operations in MySQL
1.Schema Design and Indexing:
Indexing
Ensure that your tables are properly indexed. Proper indexes can significantly speed up read and write operations.

2.Optimizing Queries
Review and optimize your queries to ensure they are as efficient as possible. Avoid complex joins and subqueries that can slow down performance.

3.Batch Processing:
Instead of performing single insert/update operations, batch multiple operations together. For example, using INSERT INTO ... VALUES (...), (...), (...) to insert multiple rows in a single query can reduce the number of transactions and improve performance.

4.Connection Pooling
Use connection pooling to manage database connections efficiently. This reduces the overhead of establishing connections and can improve performance.

## Task 2: Find Duplicate Transactions

This task involves finding duplicate transactions in the dataset. A duplicate transaction is defined as a transaction that has the same `sourceAccount`, `targetAccount`, `amount`, and `category` as another transaction, but a different `id` and `time`.

To test this feature in your browser, follow these steps:

1. Ensure that your application is running. If it's not, start it by running `npm start` in your terminal.

2. Open a web browser and navigate to the following URL:
```plaintext
http://localhost:3000/duplicates
```