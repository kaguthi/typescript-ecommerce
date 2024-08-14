const dotenv = require('dotenv');
dotenv.config()

const credentials = {
    apiKey: process.env.SMS_API_KEY,
    username: process.env.SMS_APP_NAME
}

const AfricasTalking = require('africastalking')(credentials);

const sms = AfricasTalking.SMS;

async function sendMessage() {
    const options = {
        to: ['+2547xxxxxxxxx'],
        message: "Hi Peter from E-Buy platform"
    }

    await sms.send(options)
    .then(console.log)
    .catch((err) => console.log(err))
}

module.exports = { sendMessage }