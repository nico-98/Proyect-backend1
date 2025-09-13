import { Router } from "express";
import CartManager from "../dao/managers/CartManager.js";

const router = Router();
const cartManager = new CartManager();


router.get("/:cid", async (req, res) => {
  try {
    const cart = await cartManager.getById(req.params.cid);
    res.json({ status: "success", payload: cart });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

export default router;
