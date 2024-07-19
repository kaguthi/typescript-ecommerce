const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function calculateAmount (products) {
    const totalPrice = products.reduce((total, product) => total + product.price * product.count ,0);
    return totalPrice * 100;
}
// TODO: add the cart products to the database
async function makePaymentStripe (req, res) {
    const products = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateAmount(products),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true
        }
    });

    res.send({ clientSecret: paymentIntent.client_secret })
}


module.exports = {makePaymentStripe};