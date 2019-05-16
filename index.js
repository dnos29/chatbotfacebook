const express = require('express');
const bodyParse = require('body-parser');

const app = express();

const veficationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messengeWebhook');

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

app.get('/', veficationController);
app.post('/', messageWebhookController);

app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'crowdbotics') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
})