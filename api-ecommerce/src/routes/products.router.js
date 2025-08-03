import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const manager = new ProductManager('./src/data/products.json');

router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    res.json(products);
});

router.get('/:pid', async (req, res) => {
    const id = req.params.pid;
    const product = await manager.getProductById(id);
    product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
});

router.post('/', async (req, res) => {
    const productData = req.body;
    const newProduct = await manager.addProduct(productData);
    res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
    const id = req.params.pid;
    const updateData = req.body;
    const result = await manager.updateProduct(id, updateData);
    result ? res.json(result) : res.status(404).json({ error: 'Producto no encontrado' });
});

router.delete('/:pid', async (req, res) => {
    const id = req.params.pid;
    const deleted = await manager.deleteProduct(id);
    deleted ? res.json({ message: 'Producto eliminado' }) : res.status(404).json({ error: 'Producto no encontrado' });
});

export default router;
