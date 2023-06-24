import express from "express";
import { ProductManager } from "../product_manager.js";

const router = express.Router();
const pm = new ProductManager("products.json");

router.get("/", (req, res) => {
    let productos = pm.getProducts()
    res.render("home", {title: "home", productos: productos});
});

router.get("/realtimeproducts", (req, res) => {
    let productos = pm.getProducts()
    res.render("realtimeproducts", {title: "realtime", productos: productos});
});


export default router;