// Use dotenv to read .env vars into Node
require("dotenv").config();

// Required environment variables
const ENV_VARS = [
  "PAGE_ID",
  "APP_ID",
  "PAGE_ACCESS_TOKEN",
  "APP_SECRET",
  "VERIFY_TOKEN",
  "APP_URL",
  "SHOP_URL"
];

module.exports = {
  // Page and Application information
  pageId: process.env.PAGE_ID,
  appId: process.env.APP_ID,
  pageAccesToken: process.env.PAGE_ACCESS_TOKEN,
  appSecret: process.env.APP_SECRET,
  verifyToken: process.env.VERIFY_TOKEN,

  // URL of your app domain
  appUrl: process.env.APP_URL,

  // URL of your website
  shopUrl: process.env.SHOP_URL,

  // Preferred port (default to 3000)
  port: process.env.PORT || 3000

};
