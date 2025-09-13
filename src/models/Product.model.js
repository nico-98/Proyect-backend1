import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  category: String
  // Agrega otros campos según tu necesidad
});

const Product = mongoose.model('Product', productSchema);

export default Product;