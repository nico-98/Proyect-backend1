import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const manager = new CartManager('./src/data/carts.json');

router.post('/', async (req, res) => {
    try {
        const newCart = await manager.createCart();
        if (!newCart) return res.status(500).json({ error: 'No se pudo crear el carrito' });
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const id = req.params.cid;
        const cart = await manager.getCartById(id);
        cart ? res.json(cart) : res.status(404).json({ error: 'Carrito no encontrado' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await manager.addProductToCart(cid, pid);
        updatedCart ? res.json(updatedCart) : res.status(404).json({ error: 'No se pudo agregar el producto' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;