const crypto = require("crypto");
const config = require("../config/config");

function verifyRequestSignature(req, res, buf) {
  const signature = req.headers["x-hub-signature"];
  if (!signature) {
    console.warn(`Couldn't find "x-hub-signature" in headers.`);
  } else {
    const elements = signature.split("=");
    const signatureHash = elements[1];
    const expectedHash = crypto
      .createHmac("sha1", config.appSecret)
      .update(buf)
      .digest("hex");
    if (signatureHash !== expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}

module.exports = verifyRequestSignature;
