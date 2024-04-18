const cartItemService = require("../services/cartItem.service");

const updateCartItem = async (req, res) => {
  try {
    const user = await req.user;
    const updatedCartItem = await cartItemService.updateCartItem(
      user._id,
      req.params.id,
      req.body
    );
    return res.status(200).send(updatedCartItem);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const user = await req.user;
    await cartItemService.removeCartItem(user._id, req.params.id);
    return res.status(200).send({ message: "Cart Item removed successfully!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { updateCartItem, removeCartItem };
