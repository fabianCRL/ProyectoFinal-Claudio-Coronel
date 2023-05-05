// ----------------Obteniendo el array desde el JSON local y creando la promesa con Fetch-----------------

let items = [];

fetch("./js/items.json")
    .then(response => response.json())
    .then(data => {
        items = data;
        cargarItems(items);
    })


const contenedorItems = document.querySelector("#contenedor-items");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".item-agregar");
const numCantidad = document.querySelector("#numCantidad");

// --------------- Cargar los items disponibles en la pagina---------------

function cargarItems(itemsElegidos) {

    contenedorItems.innerHTML = "";

    itemsElegidos.forEach(item => {

        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
            <img class="item-imagen" src="${item.imagen}" alt="${item.titulo}">
            <div class="item-detalles">
                <h3 class="item-titulo">${item.titulo}</h3>
                <p class="item-precio">$${item.precio}</p>
                <button class="item-agregar" id="${item.id}">Agregar</button>
            </div>
        `;

        contenedorItems.append(div);
    })

    actualizarBotonesAgregar();
}


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".item-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let itemsEnCarrito;

let itemsEnCarritoLS = localStorage.getItem("items-en-carrito");

if (itemsEnCarritoLS) {
    itemsEnCarrito = JSON.parse(itemsEnCarritoLS);
    actualizarCantidad();
} else {
    itemsEnCarrito = [];
}
// ------------- Funcion para agregar items al carrito y mostrar un tostify en la parte superior-------------

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
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
    const itemAgregado = items.find(item => item.id === idBoton);

    if (itemsEnCarrito.some(item => item.id === idBoton)) {
        const index = itemsEnCarrito.findIndex(item => item.id === idBoton);
        itemsEnCarrito[index].cantidad++;
    } else {
        itemAgregado.cantidad = 1;
        itemsEnCarrito.push(itemAgregado);
    }

    actualizarCantidad();

    localStorage.setItem("items-en-carrito", JSON.stringify(itemsEnCarrito));
}
// -------Funcion para actualizar y mostrar la cantidad de items en el carrito------------

function actualizarCantidad() {
    let nuevoCantidad = itemsEnCarrito.reduce((acc, item) => acc + item.cantidad, 0);
    numCantidad.innerText = nuevoCantidad;
}