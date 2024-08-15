const dotenv = require('dotenv');
dotenv.config();

const AfricasTalking = require('africastalking');

const credentials = {
    apiKey: process.env.SMS_API_KEY,
    username: process.env.SMS_APP_NAME
};

const africasTalking = AfricasTalking(credentials);
const sms = africasTalking.SMS;

async function sendMessage() {
    const options = {
        to: ['+254795133505'],
        message: "Hi Peter from E-Buy platform"
    };

    try {
        const response = await sms.send(options);
        console.log(response);
    } catch (err) {
        console.error('Error sending SMS:', err);
    }
}

module.exports = { sendMessage };
