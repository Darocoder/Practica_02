import fs from "fs";
export class CartManager {

    constructor(path){
        this.carts= [];
        this.path = path
    }

    saveCarts(){
        fs.writeFileSync(this.path, JSON.stringify(this.carts))
    }

    getCarts(){
        try{
            this.carts = JSON.parse(fs.readFileSync(this.path))
        }
        catch{
            this.carts = []
            this.saveCarts()
        }
        return this.carts
    }

    getCartByID(id){
        this.carts = this.getCarts();
        let carritoActual = false
        this.carts.forEach((x) => {
            if ( id == x.id )
                carritoActual = x
        })
        return carritoActual
    }

    addCart(){
        function getNextId(carts){
            let id = 0
            carts.forEach(carrito => {
                if(carrito.id > id)
                    id = carrito.id
            })
            id++
            return id
        }
        this.carts = this.getCarts();
        this.carts.push({id: getNextId(this.carts), products: []})
        this.saveCarts()
    }
    
    addProductToCart(cid, pid, quantity){
        this.carts = this.getCarts();
        let carritoBuscado = false
        this.carts.forEach(carrito => {
            if(carrito.id == cid)
                carritoBuscado = carrito
        })

        if (!carritoBuscado)
            return false
        // si estoy acá es que el carrito existe
        let productoBuscado = false
        carritoBuscado.products.forEach(producto => {
            if(producto.id == pid){
                productoBuscado = true
                producto.quantity += quantity
            }
        })
        if(!productoBuscado)
            carritoBuscado.products.push({id: pid, quantity: quantity})

        this.saveCarts()
    }
}