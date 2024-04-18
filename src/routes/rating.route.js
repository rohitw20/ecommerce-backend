const express = require("express");
const ratingController = require("../controller/rating.controller");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/create", authenticate, ratingController.createRating);
router.get(
  "/product/:productId",
  authenticate,
  ratingController.getProductRating
);

module.exports = router;
