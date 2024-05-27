const request = require('request');
const config = require("../config/config");

function callSendAPI(sender_psid, response) {
  const request_body = {
    'recipient': {
      'id': sender_psid
    },
    'message': response
  };

  request({
    'uri': 'https://graph.facebook.com/v19.0/me/messages',
    'qs': { 'access_token': config.pageAccesToken },
    'method': 'POST',
    'json': request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!');
    } else {
      console.error('Unable to send message:' + err);
    }
  });
}

module.exports = {
  callSendAPI
};
