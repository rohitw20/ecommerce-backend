const express = require("express");
const adminController = require("../controller/adminOrder.controller");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/", authenticate, adminController.getAllOrders);
router.put("/:orderId/confirmed", authenticate, adminController.confirmOrders);
router.put("/:orderId/ship", authenticate, adminController.shipOrders);
router.put("/:orderId/deliver", authenticate, adminController.deliverOrders);
router.put("/:orderId/cancel", authenticate, adminController.cancelledOrders);
router.put("/:orderId/delete", authenticate, adminController.deleteOrders);

module.exports = router;
