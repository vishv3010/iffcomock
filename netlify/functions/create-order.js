const Razorpay = require('razorpay');

exports.handler = async function(event, context) {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    try {
        const body = JSON.parse(event.body || '{}');
        const amount = body.amount || 5000;
        const currency = body.currency || 'INR';
        const receipt = body.receipt || 'receipt#1';

        if (amount < 100) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Minimum amount is 100 paise' }) };
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const order = await razorpay.orders.create({ amount, currency, receipt });

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                order_id: order.id,
                amount: order.amount,
                currency: order.currency
            })
        };
    } catch (error) {
        console.error('Create order error:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to create order' }) };
    }
};
