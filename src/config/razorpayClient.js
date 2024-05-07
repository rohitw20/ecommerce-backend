const Razorpay = require("razorpay");

const apiKey = "rzp_test_dvuxSHWzBwPBOf";
const apiSecret = "Gk0GMXOv8bQcna8MYm7Tj66i";

const razorpay = new Razorpay({
  key_id: apiKey,
  key_secret: apiSecret,
});

module.exports = razorpay;
