const API_AI_TOKEN = 'ef095618703e42bfacb6605cb1fcf037';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = 'EAAELAXDFsoYBANhqk3jEZBeZAgm8arIAFBMTUYxZCZB9ygFCXengi4IMEyFTBISNbjinMuAZCtIM0kngOcjpoTKuiIDGbD2wGfhdjiN26F016G5OLtx8S7zma676f5wKZA2BeDRMpi6bmaAxexO5mwYHejJizv4E96QHFkIpqop8amyFxLbby5';
const request = require('request');

const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: {id: senderId},
            message: {text}
        }
    })
}

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    // sendTextMessage(senderId, message);
    console.log(senderId);
    console.log(message);

    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});
    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;
        sendTextMessage(senderId, result);
    });

    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
}