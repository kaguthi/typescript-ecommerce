const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const useRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const categoryRoute = require('./routes/categoryRoute');
const paymentRoute = require('./routes/paymentRoute');
const orderRoute = require('./routes/orderRoute');
const countRoute = require('./routes/countRoute');
const path = require('path');
const app = express();
const cors = require('cors');

dotenv.config();
app.use(cors({ 
    origin: ["http://localhost:5173"],
    credentials : true, 
}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Connected to the database successfully");
    })
    .catch((err) => console.log(err.message));

app.use(cookieParser());

app.use("/", useRoute);
app.use("/products", productRoute);
app.use("/category", categoryRoute);
app.use('/create-payment-intent', paymentRoute);
app.use("/order", orderRoute);
app.use('/count', countRoute);

app.listen(process.env.PORT, ()=>{
    console.log("The server is running on Port http://localhost:5000")
});