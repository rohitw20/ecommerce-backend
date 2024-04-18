const Address = require("../models/address.model");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderItems.model");
const cartService = require("../services/cart.service");

const findOrderById = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");

  return order;
};

const createOrder = async (user, shippAddress) => {
  try {
    let address;

    if (shippAddress._id) {
      address = await Address.findById(shippAddress._id);
    } else {
      address = new Address(shippAddress);
      address.user = user;
      await address.save();

      user.addresses.push(address);
      await user.save();
    }

    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];

    for (const item of cart.cartItems) {
      const orderItem = OrderItem({
        product: item.product,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        discountedPrice: item.discountedPrice,
        userId: item.userId,
      });

      const createdOrderItem = await orderItem.save();
      orderItems.push(createdOrderItem);
    }

    const createdOrder = new Order({
      user,
      orderItems,
      shippingAddress: address,
      totalPrice: cart.totalPrice,
      totalDiscountedPrice: cart.totalDiscountedPrice,
      discount: cart.discounts,
      totalItem: cart.totalItem,
    });

    const orderSaved = createdOrder.save();
    return orderSaved;
  } catch (error) {
    throw new Error(error.message);
  }
};

const placeOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);
    order.orderStatus = "PLACED";
    order.paymentDetails.paymentStatus = "COMPLETED";
    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const confirmedOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);
    order.orderStatus = "CONFIRMED";
    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const shipOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);
    order.orderStatus = "SHIPPED";
    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const deliverOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);
    order.orderStatus = "DELIVERED";
    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const cancelOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);
    order.orderStatus = "CANCELLED";
    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const userOrderHistory = async (userId) => {
  try {
    const orders = Order.find({ user: userId, orderStatus: "PLACED" })
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
        },
      })
      .lean();
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllOrders = async () => {
  return await Order.find()
    .populate({ path: "oderItems", popuate: { path: "product" } })
    .lean();
};

const deleteOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
  findOrderById,
  userOrderHistory,
  getAllOrders,
  deleteOrder,
};
