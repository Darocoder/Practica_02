import { Router } from "express";
 import { CartManager } from "../cart_manager.js"


const router = Router();

const manejadorDeCarritos = new CartManager("carts.json");


router.post("/", (req, res) => {
    manejadorDeCarritos.addCart();
    res.status(200).send("Nuevo carrito creado");
});

router.get("/:cid", (req, res) => {
    let carrito = manejadorDeCarritos.getCartByID(req.params.cid)
    console.log("Buscando el carrito", req.params.cid, carrito)
    if(carrito)
        res.status(200).send(carrito)
    else
        res.status(400).send("No existe el carrito")
});

router.post("/:cid/product/:pid", (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    let quantity = req.body.quantity;
    if(!quantity)
        quantity = 1;
    console.log("la cantidad es ", quantity)
    const cartProd = new CartManager("carts.json");
    cartProd.addProductToCart(cartId, productId, quantity);
    res.send(cartProd);
});

export default router;