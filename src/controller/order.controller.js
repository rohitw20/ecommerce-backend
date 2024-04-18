const orderService = require("../services/order.service");

const createOrder = async (req, res) => {
  try {
    const user = await req.user;
    const createdOrder = await orderService.createOrder(user, req.body);
    return res.status(200).send(createdOrder);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const findOrderById = async (req, res) => {
  try {
    const findedOrder = await orderService.findOrderById(req.params.id);
    return res.status(200).send(findedOrder);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const orderHistory = async (req, res) => {
  try {
    const user = await req.user;
    const createdOrder = await orderService.userOrderHistory(user._id);
    return res.status(200).send(createdOrder);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const placeOrder = async (req, res) => {
  try {
    const placedOrder = await orderService.placeOrder(req.params.id);
    return res.status(200).send(placedOrder);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const shipOrder = async (req, res) => {
  try {
    const shippedOrder = await orderService.shipOrder(req.params.id);
    return res.status(200).send(shippedOrder);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createOrder,
  findOrderById,
  orderHistory,

  placeOrder,
  shipOrder,
};
