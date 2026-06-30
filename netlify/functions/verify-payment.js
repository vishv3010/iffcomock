const crypto = require('crypto');

exports.handler = async function(event, context) {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    try {
        const body = JSON.parse(event.body || '{}');
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing payment details' }) };
        }

        const key_secret = process.env.RAZORPAY_KEY_SECRET;

        const expectedSignature = crypto
            .createHmac('sha256', key_secret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ success: true, message: 'Payment verified successfully' })
            };
        } else {
            return { statusCode: 400, body: JSON.stringify({ error: 'Invalid signature' }) };
        }
    } catch (error) {
        console.error('Verify payment error:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to verify payment' }) };
    }
};
