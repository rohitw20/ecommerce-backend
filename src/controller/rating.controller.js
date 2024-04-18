const ratingService = require("../services/rating.service");

const createRating = async (req, res) => {
  try {
    const user = req.user;
    const rating = await ratingService.createRating(req.body, user);
    return res.status(201).send(rating);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getProductRating = async (req, res) => {
  try {
    const ratings = await ratingService.getProductRating(req.params.productId);
    return res.status(201).send(ratings);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { createRating, getProductRating };
