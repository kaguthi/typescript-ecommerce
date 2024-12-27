const dotenv = require('dotenv');
dotenv.config();

const AfricasTalking = require('africastalking');

const credentials = {
    apiKey: process.env.SMS_API_KEY,
    username: process.env.SMS_APP_NAME
};

const africasTalking = AfricasTalking(credentials);
const sms = africasTalking.SMS;

async function sendMessage(phone, message) {
    const options = {
        to: [phone],
        message: message
    };

    try {
        const response = await sms.send(options);
        console.log(JSON.stringify(response));
    } catch (err) {
        console.error('Error sending SMS:', err);
    }
}

module.exports = { sendMessage };
