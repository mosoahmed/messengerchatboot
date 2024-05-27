const express = require('express');
const { handleWebhookGet, handleWebhookPost } = require('../handlers/messageHandler');
const router = express.Router();

router.get('/webhook', handleWebhookGet);
router.post('/webhook', handleWebhookPost);

module.exports = router;
