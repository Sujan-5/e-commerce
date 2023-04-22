const catchAsyncError = require('../Middleware/catchAsyncErrors');
const khaltiCheckout = require('khalti-checkout-node');

exports.processPayment = catchAsyncError(async (req, res, next) => {
  const token = req.body.token;
  const amount = req.body.amount;
  try {
    const config = {
      publicKey: process.env.PUBLIC_KEY,
      secretKey: process.env.SECRET_KEY,
      paymentPreferences: ['KHALTI'],
    };
    const response = await khaltiCheckout.verifyPayment(token, config);
    console.log(response);
    // TODO: Update your database or do any other required action here
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
});

exports.sendKhaltiPublicKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ khaltiPublicKey: process.env.PUBLIC_KEY });
});
