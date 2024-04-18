const express = require("express");
const productController = require("../controller/product.controller");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/", authenticate, productController.createProduct);
router.post("/creates", authenticate, productController.createMultipleProducts);
router.put("/:id", authenticate, productController.updateProduct);
router.delete("/:id", authenticate, productController.deleteProduct);

module.exports = router;
