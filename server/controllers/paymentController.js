const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const order = require('../model/orderModel')
const { sendMessage } = require('../utils/sendSms');
const User = require("../model/userModel");

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

  const user = await User.findById(userId);

    const customer = await stripe.customers.create({
        name: user.username,
        email: user.email,
    });

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateAmount(products),
        currency: "usd",
        customer: customer.id,
        automatic_payment_methods: {
            enabled: true
        }
    });

    const message = "Thank your for shopping with us";
    const phone = 'phone number'
    const totalPrice = calculateAmount(products)
    const productId = products.map(product => product._id);
    const quantity = products.map(product => product.count);
    const orderList = await order.create({ userId, productId, quantity, totalPrice })
    sendMessage(phone, message);
    res.send({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {makePaymentStripe};