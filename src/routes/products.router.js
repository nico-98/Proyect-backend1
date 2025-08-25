import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const manager = new ProductManager('./src/data/products.json');

router.get('/', async (req, res) => {
    try {
        const products = await manager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const product = await manager.getProductById(id);
        product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post('/', async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await manager.addProduct(productData);
        if (!newProduct) return res.status(400).json({ error: 'Datos inválidos' });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const updateData = req.body;
        const result = await manager.updateProduct(id, updateData);
        result ? res.json(result) : res.status(404).json({ error: 'Producto no encontrado' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const deleted = await manager.deleteProduct(id);
        deleted ? res.json({ message: 'Producto eliminado' }) : res.status(404).json({ error: 'Producto no encontrado' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;
