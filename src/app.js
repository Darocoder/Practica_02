import express from "express";
import productRouter from "../src/routes/products-route.js"
import cartsRouter from "../src/routes/carts-route.js"
import viewsRouter from "./routes/views-router.js"
import __dirname from "./utils.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import { ProductManager } from "./product_manager.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());

app.use("/api/products", productRouter);
app.use("/api/cart", cartsRouter);
app.use("/", viewsRouter)

app.set("views", `${__dirname}/views`);
app.set ("view engine", "handlebars");
app.use(express.static(__dirname+"/public"));

const servidorHttp = app.listen(PORT, () => {
    console.log(`servidor en el puerto ${PORT}`)
});

const io = new Server(servidorHttp)

io.on("connection", (socket) => {
    socket.broadcast.emit ("todos_menos_el_cliente", `${socket.id} está conectado.`);
    socket.emit("mensaje_al_cliente", `Hola, ${socket.id}!`);  
    io.emit("mensaje_para_todos","Este mensaje lo tienen que recibir todos los clientes.");

    // recibo un mensaje del cliente, pidiendo agregar un producto
    socket.on("solicito_agregar_producto", (product) => {
        const pm = new ProductManager("products.json")
        console.log("El cliente ", socket.id , " actualizó productos",  product)

        if (pm.addProduct(product)){
            io.emit("actualizar_productos", pm.getProducts())
        }else{
            socket.emit("evento_para_socket_individual", `Usuario: ${socket.id}, producto incorrecto.`);  
        }
    });

});

function avisarQueActualizaronProductos() {
    const pm = new ProductManager("products.json")
    let productos = pm.getProducts()
    console.log("aviso que actualizaron productos: " + productos.length);
    io.emit("actualizar_productos",productos);
}

export {avisarQueActualizaronProductos}