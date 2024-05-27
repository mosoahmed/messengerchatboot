const config = require("../config/config");
const { callSendAPI } = require("./apiHandler");
const { sendEmail } = require("./emailHandler");
const fs = require('fs');

// Load product dataset
const products = JSON.parse(fs.readFileSync('./src/data/products.json', 'utf8'));
const greetedUsers = new Set();
const greetings = [
  "Hello! Welcome to our service. How can I assist you today?",
  "Hi there! Glad to have you here. How can I help?",
  "Greetings! How can I be of service to you today?",
  "Hey! Welcome! How can I assist you?",
  "Hello! How can I help you today?"
];

function handleWebhookGet(req, res) {
  const VERIFY_TOKEN = config.verifyToken;
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WEBHOOK_VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
}

function handleWebhookPost(req, res) {
  const body = req.body;
  if (body.object === 'page') {
    body.entry.forEach(function (entry) {
      const webhook_event = entry.messaging[0];
      const sender_psid = webhook_event.sender.id;

      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      }
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
}

function handleMessage(sender_psid, received_message) {
  let response;
  if (!greetedUsers.has(sender_psid)) {
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    response = { 'text': randomGreeting };
    greetedUsers.add(sender_psid);
  } else {
    // Parse the message for product queries
    const text = received_message.text.toLowerCase();
    const [command, productId] = text.split(' ');
    // Find the product by SKU
    const product = products.find(p => p.sku.toString() === productId);
    // Handle different commands
    if (product) {
      switch (command) {
        case '/desc':
          response = { 'text': `Description: ${product.description}` };
          break;
        case '/price':
          response = { 'text': `Price: $${product.price}` };
          break;
        case '/shipping':
          response = { 'text': `Shipping Fee: $${product.shipping}` };
          break;
        case '/buy':
          // Fetch product details based on productId (implement this based on your data source)
          const productDetails = `Product ID: ${productId}\nProduct Description: ${product.description}\nProduct Price: $${product.price}\nProduct Shipping fee: $${product.shipping}`; // Example details
          // Send email to admin
          sendEmail('New Purchase Order', `User with PSID ${sender_psid} wants to buy the following product:\n\n${productDetails}`);
          response = { 'text': 'Thank you for your purchase request. We will process it shortly.' };
          break;
        default:
          response = { 'text': 'Sorry, I did not understand that command. Please use /desc, /price, or /shipping followed by the product ID.' };
      }
    } else {
      response = { 'text': 'Sorry, I could not find that product. Please check the product ID and try again.' };
    }
  }
  callSendAPI(sender_psid, response);
}

module.exports = {
  handleWebhookGet,
  handleWebhookPost
};
