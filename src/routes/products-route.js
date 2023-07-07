import { Router } from "express";
import { ProductManager, Product } from "../product_manager.js"
import { productModel } from "../Dao/models/products.model.js";

const router = Router();


router.get('/', async (req, res) => {
    let products =  await productModel.find()
    res.send(products)
})

router.get("/:pid", async (req, res) => {    
    try{
        const pid = req.params.pid;
        let product = await productModel.find({_id: pid})
        res.send(product);
    }
    catch(err){
        res.send("Producto no encontrado")
    }
});

/*
[
    {
        "title":"Pero",
        "description":"Perosa",
        "code":"sfladkfjs", // no se puede repetir
        "price":"1234"
    },
    {
        "title":"Papa",
        "description":"Perosa",
        "code":"adsjfsad",
        "price":"123",
    }
]

*/
router.post("/", async (req, res) => {
    const newProduct = new Product(req.body);
    try{
        await productModel.create(newProduct)
        res.status(200).send("Producto agregado correctamente");
    }
    catch (err){
        console.log("Error: ", err)
        res.status(400).send("Error al agregar el producto a mongo")
    }
});

router.put("/:pid",async (req, res) => {
    const newProduct = new Product(req.body);
    try{
        await productModel.updateOne({_id:req.params.pid},newProduct)
        res.status(200).send("Producto editado correctamente");
    }
    catch (err){
        console.log("Error: ", err)
        res.status(400).send("Error al editar el producto")
    }
});

router.delete("/:pid",async (req, res) => {
    try{
        const pid = req.params.pid;
        await productModel.deleteOne({_id: pid})
        res.send("Producto eliminado correctamente");
    }
    catch(err){
        res.send("Producto no encontrado")
    }
});

export default router;