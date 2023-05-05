
// -------------- Definiendo las variables ----------------

let itemsEnCarrito = localStorage.getItem("items-en-carrito");
itemsEnCarrito = JSON.parse(itemsEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoItems = document.querySelector("#carrito-items");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-item-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

// ----------------- Cargando items en el carrito-------------

function cargarItemsCarrito() {
    if (itemsEnCarrito && itemsEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoItems.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoItems.innerHTML = "";

        itemsEnCarrito.forEach(item => {

            const div = document.createElement("div");
            div.classList.add("carrito-item");
            div.innerHTML = `
                <img class="carrito-item-imagen" src="${item.imagen}" alt="${item.titulo}">
                <div class="carrito-item-titulo">
                    <small>Título</small>
                    <h3>${item.titulo}</h3>
                </div>
                <div class="carrito-item-cantidad">
                    <small>Cantidad</small>
                    <p>${item.cantidad}</p>
                </div>
                <div class="carrito-item-precio">
                    <small>Precio</small>
                    <p>$${item.precio}</p>
                </div>
                <div class="carrito-item-subtotal">
                    <small>Subtotal</small>
                    <p>$${item.precio * item.cantidad}</p>
                </div>
                <button class="carrito-item-eliminar" id="${item.id}"><i class="bi bi-trash-fill"></i></button>
            `;

            contenedorCarritoItems.append(div);
        })

        actualizarBotonesEliminar();
        actualizarTotal();

    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoItems.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarItemsCarrito();

// ----------------- Definiendo las funciones-----------------

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-item-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #c90d0d, #785ce9)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: "1rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function () { } // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const index = itemsEnCarrito.findIndex(item => item.id === idBoton);

    itemsEnCarrito.splice(index, 1);
    cargarItemsCarrito();

    localStorage.setItem("items-en-carrito", JSON.stringify(itemsEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${itemsEnCarrito.reduce((acc, item) => acc + item.cantidad, 0)} items.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        confirmButtonColor:'#c90d0d',
    }).then((result) => {
        if (result.isConfirmed) {
            itemsEnCarrito.length = 0;
            localStorage.setItem("items-en-carrito", JSON.stringify(itemsEnCarrito));
            cargarItemsCarrito();
        }
    })
}


function actualizarTotal() {
    const totalCalculado = itemsEnCarrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    itemsEnCarrito.length = 0;
    localStorage.setItem("items-en-carrito", JSON.stringify(itemsEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoItems.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}