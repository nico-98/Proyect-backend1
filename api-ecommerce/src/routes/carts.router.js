import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const manager = new CartManager('./src/data/carts.json');

router.post('/', async (req, res) => {
    const newCart = await manager.createCart();
    res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
    const id = req.params.cid;
    const cart = await manager.getCartById(id);
    cart ? res.json(cart) : res.status(404).json({ error: 'Carrito no encontrado' });
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const updatedCart = await manager.addProductToCart(cid, pid);
    updatedCart ? res.json(updatedCart) : res.status(404).json({ error: 'No se pudo agregar el producto' });
});

export default router;
