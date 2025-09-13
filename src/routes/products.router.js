
import { Router } from "express";
import ProductManager from "../dao/managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getAll();
    res.json({ status: "success", payload: products });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

export default router;
