import timestamp from '../utils/timestamp.js';
import 'dotenv/config';
async function mpesa(req, res) {
    const phone = req.body.phone;
    if(!phone) {
        res.status(404).json({ message: "Phone number required"})
    }  

    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const token = req.token;
    const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');

    const auth = `Bearer ${token}`;
    // const CallBackURL = "https://6f35-197-237-75-84.ngrok-free.app/payment/callback";
    const amount = 1

    const payload = {
        "BusinessShortCode": process.env.MPESA_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": process.env.MPESA_SHORTCODE,
        "PhoneNumber": phone,
        "CallBackURL": process.env.CALLBACK_URL,
        "AccountReference": "E-buy Store",
        "TransactionDesc": "Payment for goods purchased"
    }

    try {
        const response = await fetch(url,{
            method: "POST",
            headers: {
                'Authorization': auth,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(payload),
        });
        const responseData = await response.json();
        res.status(201).json({
            message: "Request sent successfully.",
            data: responseData,
            status: "success"
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message, status: error})
    }
}

export { mpesa }