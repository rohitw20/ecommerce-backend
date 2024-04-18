const express = require("express");
const orderController = require("../controller/order.controller");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/", authenticate, orderController.createOrder);
router.get("/:id", authenticate, orderController.findOrderById);
router.get("/user", authenticate, orderController.orderHistory);

module.exports = router;
