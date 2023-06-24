import fs from "fs";
import {avisarQueActualizaronProductos} from "./app.js"

export class Product {
    constructor({title, description, price, status, thumbnail, code, stock}){
        this.id = undefined
        this.title = title 
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.status = status
    }
}

export class ProductManager {

    constructor(){
        this.products= [],
        this.path = "productos.json"
    }

    getProductsFromArray(){
        console.log("En el array tengo " + this.products.length + " productos")
        return this.products
    }

    getProducts(){
        //console.log("Nuevo array desde fs " + this.path)
        this.products = JSON.parse(fs.readFileSync(this.path))
        return this.products
    }

    saveProducts(){
        fs.writeFileSync(this.path, JSON.stringify(this.products))
    }

    getProductByID(id){
        let producto    
        this.products.forEach(product => {
            if(product.id == id)
            producto=product
        })

        if (producto === undefined){
            return false
        }
        return producto 
    }
    

    deleteProductByID(id){
        if (!this.products.some((product) => product.id == id )) {
            console.log ("No se encuentra el id: " + id +  ". No se ha eliminado nada.")
            return false
        }

        let nuevoArray = []
        

        this.products.forEach(product => {
            if(product.id != id)
                nuevoArray.push(product)
            else
            console.log("Eliminando", product)

        })


        
        this.products = []
        nuevoArray.forEach(product => {
        this.products.push(product)
        console.log("me quedo con el con los productos", product)
        })

        this.saveProducts()

        return true  
    }
    

    updateProduct(id , p){

        let codigoExistente = false
        let actualizado = false
        this.products.forEach(product => {
            if(product.id == id){
                this.products.forEach(x => {
                    if(x.id != id){
                        if(x.code == p.code)
                            codigoExistente = true
                    }
                })
            
                if (!codigoExistente){  
                    product.title = p.title 
                    product.description = p.description
                    product.price = p.price
                    product.thumbnail = p.thumbnail
                    product.code = p.code
                    product.stock = p.stock
                    product.status = p.status
                    actualizado = true
                }else{
                    console.log ("El id "+id+ " existe, pero el código " + p.code +" ya estaba en otro producto.")
                }
                }  
        })
        this.saveProducts()

        console.log(actualizado?"Producto actualizado":"Error al actualizar el producto")
        return actualizado
        
}
    

    addProduct(p){
        this.getProducts()
        if (this.products.some((product) => product.code == p.code )) {
            console.log ("Producto ignorado " + p.code) +  ", está repetido."
            return false
        }

        let idDelNuevoProducto = 0
        this.products.forEach(product => {
            if(product.id > idDelNuevoProducto)
                idDelNuevoProducto=product.id
        });
        idDelNuevoProducto++
        p.id = idDelNuevoProducto
        console.log("Antes:", this.products)

        this.products.push(p)
        this.saveProducts()
        console.log("Después:", this.products)

        avisarQueActualizaronProductos()
        return true
    }
}


// // genero algunos productos para después agregarlos
// const producto1 = new Product("manzana", "roja", 300, "Link", "001", 3000);
// const producto2 = new Product("pera", "amarilla", 340, "Link", "002", 1000);
// const producto3 = new Product("durazno", "misionero", 400, "Link", "003", 1200);
// const producto4 = new Product("mandarina", "ombligo", 233, "Link", "004", 3400);
// const producto5 = new Product("sandía", "gigante", 670, "Link", "005", 566);


// console.log("Productos a incluir")
// console.log (producto1,producto2,producto3,producto4,producto5)

// const administradorDeProductos = new ProductManager()

// administradorDeProductos.addProduct(producto1)
// administradorDeProductos.addProduct(producto2)
// administradorDeProductos.addProduct(producto3)
// administradorDeProductos.addProduct(producto4)
// administradorDeProductos.addProduct(producto5)

// administradorDeProductos.getProductsFromArray()
// console.log("Productos antes de guardar en la database")

// administradorDeProductos.saveProducts()


// console.log("Nuevo objeto")
// const administradorDeProductosNuevo = new ProductManager()

// console.log ("objeto vacío:", administradorDeProductosNuevo.getProductsFromArray())

// console.log("Productos contenidos en el json:", administradorDeProductosNuevo.getProducts())

// console.log ("Búqueda de producto con ID 5:", administradorDeProductosNuevo.getProductByID(5))
// console.log ("Buscando un producto que no existe aun:", administradorDeProductosNuevo.getProductByID(20))

// const producto6 = new Product("pomelo", "rosado", 452, "Link", "006", 214)

// console.log("Actualizando el artículo 006 con el objeto recién creado")
// administradorDeProductosNuevo.updateProduct(6, producto6)
// console.log("Array completo: ", administradorDeProductosNuevo.getProductsFromArray())


// administradorDeProductosNuevo.updateProduct(1, producto6)
// console.log("Update del array: ", administradorDeProductosNuevo.getProductsFromArray())
    
// console.log("Update con producto repetido")
// administradorDeProductosNuevo.updateProduct(3, producto6)
// console.log("Resultado luego del update: ", administradorDeProductosNuevo.getProductsFromArray())

// administradorDeProductosNuevo.deleteProductByID(30)

// administradorDeProductosNuevo.deleteProductByID(2)
// console.log("Array de productos luego de eliminar el producto con ID 2: ", administradorDeProductosNuevo.getProductsFromArray())


// console.log("Se agrega el producto eliminado")
// administradorDeProductosNuevo.addProduct(producto3)
// console.log("Así quedaría el array de productos final: ", administradorDeProductosNuevo.getProductsFromArray())
