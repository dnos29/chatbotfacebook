const processMessage = require('../helpers/processMessage');

module.exports = (req, res) =>{
    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {
            processMessage(event);
            // sendMessage(event.sender.id, {text: "Echo: " + event.message.text});
        }
    }
    res.status(200).send();
}