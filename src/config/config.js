require("dotenv").config();

const ENV_VARS = [
  "PAGE_ID",
  "APP_ID",
  "PAGE_ACCESS_TOKEN",
  "APP_SECRET",
  "VERIFY_TOKEN",
  "APP_URL",
  "SHOP_URL",
  "ADMIN_EMAIL",
  "EMAIL_HOST",
  "EMAIL_PORT",
  "EMAIL_USER",
  "EMAIL_PASS"
];

const missingVars = ENV_VARS.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
}

module.exports = {
  pageId: process.env.PAGE_ID,
  appId: process.env.APP_ID,
  pageAccesToken: process.env.PAGE_ACCESS_TOKEN,
  appSecret: process.env.APP_SECRET,
  verifyToken: process.env.VERIFY_TOKEN,
  appUrl: process.env.APP_URL,
  shopUrl: process.env.SHOP_URL,
  port: process.env.PORT || 3000,
  adminEmail: process.env.ADMIN_EMAIL,
  smtpHost: process.env.EMAIL_HOST,
  smtpPort: process.env.EMAIL_PORT,
  smtpUser: process.env.EMAIL_USER,
  smtpPass: process.env.EMAIL_PASS
};
