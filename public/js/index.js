const socket = io();

socket.on ("todos_menos_el_cliente", (data) => {
    console.log ("El servidor nos dijo a todos menos a:", data)
}) ;

socket.on ("mensaje_al_cliente", (data) => {
    console.log("El servidor me dijo: ", data)
}) ;

socket.on ("mensaje_para_todos", (data) => {
    console.log("El servidor nos dijo a todos: ", data)
}) ;

// cuando hacen clic en "enviar", atajo los valores con esta función
// que envía el producto (sin validar) al servidor
const form = document.getElementById('formularioAgregarProducto')
form.addEventListener('submit', e => {
    e.preventDefault()
    console.log("Presionaron send")
    const product = {
        title: form.elements.title.value,
        description: form.elements.description.value,
        code: form.elements.code.value,
        price: form.elements.price.value,
    }
    console.log("Evento formulario", product)
    socket.emit('solicito_agregar_producto', product)
    form.reset()
})

// el servidor me dice que redibuje la pantalla con los productos nuevos
socket.on ("actualizar_productos", (data) => {
    console.log("Recibimos todos: ", data)
    let divQueContieneProductos = document.getElementById("divQueContieneProductos")
    if (divQueContieneProductos)
        divQueContieneProductos.remove()
    divQueContieneProductos = document.createElement("div")
    divQueContieneProductos.id="divQueContieneProductos"
  //  console.log("Nuevo array", data)
    data.forEach( (prod) => {
        let contenido = prod.id + " <br> ✓ " + prod.title + " <br> ✓ " + prod.description  + " <br> ✓ " + prod.code  + " <br> ✓ " + prod.price    
        let linea = document.createElement("p")
        linea.innerHTML = contenido
        divQueContieneProductos.append(linea)
    }) 
    document.body.append(divQueContieneProductos)
    console.log(divQueContieneProductos)
}) ;