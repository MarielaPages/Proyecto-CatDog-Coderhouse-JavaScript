//Armo lista de productos
let productos = [
    {id: 1, nombre: "Three floor cat tree", precio: 120, imagen: "./media/fotos/three-floor-cat-tree.jpg"},
    {id: 2, nombre: "Green dog jacket", precio: 90, imagen: "./media/fotos/green-dog-jacket.jpeg"},
    {id: 3, nombre:"Banana cat bed", precio: 80, imagen:"./media/fotos/Funny-Banana-Cat-Bed.jpg"},
    {id: 4, nombre:"Little cat tree", precio: 100, imagen:"./media/fotos/little-cat-tree.jpg"},
    {id: 5, nombre:"Star dog pyjama", precio: 70, imagen:"./media/fotos/dog-pyjama.jpg"},
    {id: 6, nombre:"Tower cat tree", precio: 120, imagen:"./media/fotos/Tower-Cat-Tree.webp"}
]

const contenedor = document.getElementById("contenedorProductos")
contenedor.innerHTML = ""

productos.forEach((producto, index) => {
    let card = document.createElement("div");
    card.classList.add("prodBack");
    card.innerHTML = `<a href="${producto.imagen}" data-lightbox="roadtrip">
                                <img src="${producto.imagen}" alt="${producto.nombre}" width="400" class="marginBottomStandard scaleImage picturesSection__img">
                            </a>
                            <p class="lightLetters bigProdLetters">${(producto.nombre).toUpperCase()}</p>
                            <p>usd ${producto.precio}</p>
                            <button class="prodButton borderRadius" onclick="abrirCarrito(${index})">Buy</button>`
    contenedor.appendChild(card)
})

//Creo el carrito y las funciones para ingresar productos al mismo. 
let carritoVisible = document.getElementById("carritoVisible")

let cart = [];

if (localStorage.getItem("carrito actualizado")) {
    cart = JSON.parse(localStorage.getItem("carrito actualizado"));
    actualizarCarrito();
}

const abrirCarrito = function(indexProducts){
    const indiceEncontradoCarrito = cart.findIndex((elemento) => {
        return elemento.id === productos[indexProducts].id;
      });
      if (indiceEncontradoCarrito === -1) {
        //agrego el producto
        const productoAgregar = productos[indexProducts];
        productoAgregar.cantidad = 1;
        cart.push(productoAgregar);
        actualizarCarrito();
      } else {
        //incremento cantidad
        cart[indiceEncontradoCarrito].cantidad += 1;
        actualizarCarrito();
      }
}

//Dibujo el carrito que se armara a partir de los productos en el array cart
function actualizarCarrito(){
    let total = 0;
    carritoVisible.classList.add("carrito");
    carritoVisible.innerHTML = "";
    if (cart.length > 0){
        cart.forEach((producto, index) => {
            total = total + producto.precio * producto.cantidad;
            const productoCompradoContainer = document.createElement("div")
            productoCompradoContainer.classList.add("contenedorProductosComprados");
            productoCompradoContainer.innerHTML = `
                <img class="cartImage" src="${producto.imagen}">
                <p class="productoPropiedad"> ${producto.nombre} </p>
                <p class="productoPropiedad"> Cantidad: ${producto.cantidad} </p>
                <p class="productoPropiedad"> Precio: ${producto.precio} </p>
                <p class="productoPropiedad"> Subtotal: $ ${producto.precio * producto.cantidad} </p>
                <div id="deleteButton"> <button class="prodButton borderRadius" onclick="borrarProducto(${index})">Delete</button> </div>`
            carritoVisible.appendChild(productoCompradoContainer);
        })
        const totalContainer = document.createElement("div")
        totalContainer.classList.add("totalContainer")
        totalContainer.innerHTML = `<div class="productoPropiedad" id="totalCompra"> TOTAL: $${total} </div>
        <button class="prodButton borderRadius" onclick="finalizarCompra()">Finish Purchase</button>`
        carritoVisible.appendChild(totalContainer)
    }
    else{ 
        carritoVisible.classList.remove("carrito")
    }
    localStorage.setItem("carrito actualizado", JSON.stringify(cart));
}

//Elimino los productos que ya no desee el usuario
function borrarProducto(indice){
    cart.splice(indice, 1);
    actualizarCarrito();
}

//Finalizo la compra
function finalizarCompra(){
    const totalPagar = document.getElementById("totalCompra").innerHTML;
    carritoVisible.innerHTML = `<div id="almostThereDiv"><p> You are almost done, you have to pay ${totalPagar}<p>
                                <p> Please complete the form so that we can arrange the delivery <p> 
                                <button class="prodButton borderRadius" onclick="formulario()">Form</button> </div>`;

}

function formulario(){
    carritoVisible.innerHTML = `<p class="textCenter" id="tituloHomeForm"><b>Please, fill in the form:</b></p>
                                <form id="formForDelivery">
                                    <div id="formForDelivery2">
                                        <div class="alignOptions">
                                        <label for="nomreApellidoHomeForm">
                                        Full Name:
                                        </label>
                                        <input type="text" id="nomreApellidoHomeForm" placeholder=" Full Name" class="formForDeliveryOptions"></div>
                                        <div class="alignOptions">
                                        <label for="homeFormMail">
                                        E-mail:
                                        </label>
                                        <input type="email" id="homeFormMail" placeholder=" E-mail" class="formForDeliveryOptions"></div>
                                        <div class="alignOptions">
                                        <label for="direccionHomeForm">
                                        Address:
                                        </label>
                                        <input type="text" id="direccionHomeForm" placeholder=" Address" class="formForDeliveryOptions"></div>
                                        <div class="alignOptions">
                                        <label for="telefonoHomeForm"> 
                                        Cell phone:
                                        </label>
                                        <input type="number" id="telefonoHomeForm" placeholder=" Cell phone" class="formForDeliveryOptions"></div>
                                    </div>
                                    <button class="prodButton borderRadius" onclick="finalizarFormulario()">Submit</button>
                                </form>`
}

function finalizarFormulario(){
    let nombreCliente = document.getElementById("nomreApellidoHomeForm").value;
    let domicilioCliente = document.getElementById("direccionHomeForm").value
    carritoVisible.innerHTML = `<p><b>Thank you ${nombreCliente} for choosing us. Your delivery will arrive in the next 5 days on ${domicilioCliente}</b></p>`;
}

//animacion del logo
$("#logoHome").fadeOut(1000)
                .fadeIn(1000);



