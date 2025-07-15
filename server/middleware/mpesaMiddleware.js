async function mpesaMiddleware(req, res, next){
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    
    try {
        const response = await fetch(url,{
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(process.env.MPESA_CONSUMER_KEY + ':' + process.env.MPESA_CONSUMER_SECRET).toString('base64')
        }});
        const data = await response.json();
        req.token = data.access_token;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default mpesaMiddleware;