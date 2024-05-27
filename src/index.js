const express = require('express');
const bodyParser = require('body-parser');
const verifyRequestSignature = require('./middleware/verifyRequestSignature');
const webhookRoutes = require('./routes/webhook');
const config = require('./config/config');
const { transactions, findDuplicateTransactions } = require('./routes/transactions');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ verify: verifyRequestSignature }));
// Set EJS as the view engine
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Task 1: create messenger chatbot
app.use('/', webhookRoutes);

// TASK  2, Find Duplicate Transactions
// Define a route to display the duplicate transactions
app.get('/duplicates', (req, res) => {
  const duplicateGroups = findDuplicateTransactions(transactions);
  console.log(duplicateGroups);
  res.render('duplicates', { duplicateGroups });
});


app.get('/', (req, res) => {
  // return text message to lock to the console for how to use the app
  res.send('Hello, to use the app, check the console for the instructions.');
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
  if (config.appUrl && config.verifyToken) {
    console.log(
      "Is this the first time running?\n" +
      "Make sure to set both the Messenger profile, persona " +
      "and webhook by visiting:\n" +
      `${config.appUrl}/profile?mode=all&verify_token=${config.verifyToken}`
    );
  }
  if (config.pageId) {
    console.log("Test your app by messaging:");
    console.log(`https://m.me/${config.pageId}`);
  }
});