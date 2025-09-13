import Cart from "../../models/Cart.model.js";

class CartManager {
  async getAll() {
    return await Cart.find().populate('products.product');
  }

  async getById(id) {
    return await Cart.findById(id).populate('products.product');
  }

  async create(cartData) {
    return await Cart.create(cartData);
  }

  async update(id, cartData) {
    return await Cart.findByIdAndUpdate(id, cartData, { new: true });
  }

  async delete(id) {
    return await Cart.findByIdAndDelete(id);
  }
}

export default CartManager;