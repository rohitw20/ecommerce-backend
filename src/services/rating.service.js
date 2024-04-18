const Rating = require("../models/rating.model");
const productService = require("../services/product.service");

const createRating = async (reqData, user) => {
  try {
    const product = await productService.findProductById(reqData.productId);
    const rating = new Rating({
      user: user._id,
      product: product._id,
      rating: reqData.rating,
      createdAt: new Date(),
    });

    return await rating.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProductRating = async (productId) => {
  try {
    return await Rating.find({ product: productId });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createRating, getProductRating };
