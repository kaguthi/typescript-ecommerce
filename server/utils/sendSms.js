const credentials = {
    apiKey: '',
    username: 'jellybeans'
}

const AfricasTalking = require('africastalking')(credentials);

const sms = AfricasTalking.SMS;

export function sendMessage() {
    const options = {
        to: [''],
        message: "Hi Peter from E-Buy platform"
    }

    sms.send(options)
    .then(console.log)
    .catch(console.log)
}