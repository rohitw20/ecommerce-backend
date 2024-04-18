const Review = require("../models/review.model");
const productService = require("../services/product.service");

const createReview = async (reqData, user) => {
  try {
    const product = await productService.findProductById(reqData.productId);
    const review = new Review({
      user: user._id,
      product: product._id,
      review: reqData.review,
      createdAt: new Date(),
    });

    await product.save();
    return await review.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllReview = async (productId) => {
  try {
    return await Review.find({ product: productId }).populate("user");
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createReview, getAllReview };
