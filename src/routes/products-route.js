import { Router } from "express";
import { ProductManager, Product } from "../product_manager.js"

const router = Router();


router.get('/', (req, res) => {
    const productsManager = new ProductManager();
    const products = productsManager.getProducts();
    const productSlice = products.slice(0, req.query.limit);
    res.send(JSON.stringify(productSlice));
})

router.get("/:pid", (req, res) => {
    const manejadorDeProductos = new ProductManager();
    manejadorDeProductos.getProducts();
    console.log(manejadorDeProductos.products);
    const pid = parseInt(req.params.pid); //convierto el id a número
    if (isNaN(pid)) { //si el id no es un número devuelvo el error 400
        res.status(400).send("El id debe ser un número.");
        return;
    }
    const product = manejadorDeProductos.getProductByID(req.params.pid);
    if(!product) {
        res.status(400).send("Producto no encontrado");
        return;
    }
    res.send(JSON.stringify(product));
});

router.post("/", (req, res) => {
    console.log("Haciendo un POST");
    try {
        const newProduct = new Product(req.body);
        const manejadorDeProductos = new ProductManager();
        manejadorDeProductos.getProducts(); //traigo los productos del archivo productos.json
        if(manejadorDeProductos.addProduct(newProduct))
            res.status(201).send("Producto agregado")
        else
            res.status(400).send("El Code ya existe")
    }catch (error) {    
        res.status(400).send("Error al crear el producto");
    };
});

router.put("/:pid",(req, res) => {
    const newProduct = new Product(req.body);
    const manejadorDeProductos = new ProductManager();
    manejadorDeProductos.getProducts(); //traigo los productos del archivo productos.json
    if(manejadorDeProductos.updateProduct(req.params.pid, newProduct)) //le paso el pid ingresado en la url y ejecuto el método para actualizar todas las propiedades del producto.
        res.status(200).send("Producto actualizado")
    else
        res.status(404).send("El ID no existe")
});

router.delete("/:pid",(req, res) => {
    const manejadorDeProductos = new ProductManager();
    manejadorDeProductos.getProducts(); //traigo los productos del archivo productos.json
    if(manejadorDeProductos.deleteProductByID(req.params.pid))
        res.status(200).send("Producto eliminado")
    else
        res.status(404).send("No existe el producto")
});

export default router;