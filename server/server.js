const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const useRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const categoryRoute = require('./routes/categoryRoute');
const path = require('path');
const app = express();
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

dotenv.config();
app.use(cors({ origin: ["http://localhost:5173"]}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const calculateAmount = (cartproducts) => {
    const totalPrice = cartproducts.reduce((total, product) => total + product.count * product.price ,0)
    return totalPrice * 100;
}

app.post('/create-payment-intent', async (req, res) => {
    const products = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount : calculateAmount(products),
        currency : "usd",
        automatic_payment_methods : {
            enabled: true
        }
    });

    res.send({ clientSecret: paymentIntent.client_secret })
})

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Connected successfully");
    })
    .catch((err) => console.log(err.message));

app.use(cookieParser());

// all routes
app.use("/", useRoute);
app.use("/products", productRoute);
app.use("/category", categoryRoute);

// server
app.listen(process.env.PORT, ()=>{
    console.log("The server is running on Port http://localhost:5000")
});