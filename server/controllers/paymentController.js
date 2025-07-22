import Stripe from 'stripe';
import 'dotenv/config';               
import order from '../models/orderModel.js';
import User  from '../models/userModel.js';

function calculateAmount (products) {
    const totalPrice = products.reduce((total, product) => total + product.price * product.count ,0);
    return totalPrice * 100;
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

    const totalPrice = calculateAmount(products)
    const productId = products.map(product => product._id);
    const quantity = products.map(product => product.count);
    const orderList = await order.create({ userId, productId, quantity, totalPrice })
    res.send({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {makePaymentStripe};