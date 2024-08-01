const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const order = require('../model/orderModel')

function calculateAmount (products) {
    const totalPrice = products.reduce((total, product) => total + product.price * product.count ,0);
    return totalPrice * 100;
}

async function makePaymentStripe (req, res) {
  try {
    const { products, userId } = req.body;
    if (!products || !userId) {
      return res.status(400).json({ message: "Invalid request: Missing products or userId" });
  }

    const customer = await stripe.customers.create({
        name: 'Amelia Cooper',
        email: 'amelia@gmail.com',
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

    const productId = products.map(product => product._id);
    const quantity = products.map(product => product.count);
    const orderList = await order.create({ userId, productId, quantity })
    
    res.send({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
}

module.exports = {makePaymentStripe};