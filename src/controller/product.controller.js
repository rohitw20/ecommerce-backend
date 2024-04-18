const productService = require("../services/product.service");

const createProduct = async (req, res) => {
  try {
    const createdProduct = await productService.createProduct(req.body);
    return res.status(201).send(createdProduct);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    return res.status(201).send({ message: "product deleted successfully!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    await productService.updateProduct(req.params.id, req.body);
    return res.status(201).send({ message: "product updated successfully!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const findProductById = async (req, res) => {
  try {
    const product = await productService.findProductById(req.params.id);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req.query);
    return res.status(201).send(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const createMultipleProducts = async (req, res) => {
  try {
    await productService.createMultipleProduct(req.body);
    return res.status(201).send({ message: "products created successfully!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  findProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  createMultipleProducts,
};
