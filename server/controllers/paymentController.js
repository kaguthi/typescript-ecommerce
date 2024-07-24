const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const order = require('../model/orderModel')

function calculateAmount (products) {
    const totalPrice = products.reduce((total, product) => total + product.price * product.count ,0);
    return totalPrice * 100;
}
// TODO: add the cart products to the database
async function makePaymentStripe (req, res) {
  try {
    const products = req.body;
    if (!products) {
        return res.send(404).json({ message: "Empty request"})
    }

    const customer = await stripe.customers.create({
        name: 'Tom Keen',
        email: 'tom@gmail.com',
        phone: '+254712345678'
    });

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateAmount(products),
        currency: "usd",
        customer: customer.id,
        automatic_payment_methods: {
            enabled: true
        }
    });
    
    res.send({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
}


module.exports = {makePaymentStripe};