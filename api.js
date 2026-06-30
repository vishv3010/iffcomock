const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const router = express.Router();

// --- API ROUTES ---

// 1. Create Order
router.post('/create-order', async (req, res) => {
    try {
        const { amount = 5000, currency = 'INR', receipt = 'receipt#1' } = req.body || {};

        if (amount < 100) {
            return res.status(400).json({ error: 'Minimum amount is 100 paise' });
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const order = await razorpay.orders.create({
            amount: amount,
            currency: currency,
            receipt: receipt
        });

        res.status(200).json({
            order_id: order.id,
            amount: order.amount,
            currency: order.currency
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// 2. Verify Payment
router.post('/verify-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ error: 'Missing payment details' });
        }

        const key_secret = process.env.RAZORPAY_KEY_SECRET;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', key_secret)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            return res.status(200).json({ success: true, message: 'Payment verified successfully' });
        } else {
            return res.status(400).json({ error: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Verify payment error:', error);
        res.status(500).json({ error: 'Failed to verify payment' });
    }
});

// Mount the router on both paths to support local and Netlify environments
app.use('/api', router);
app.use('/.netlify/functions/api', router);

// Export the app wrapped by serverless-http
module.exports.handler = serverless(app);
