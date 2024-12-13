// Datos iniciales
const carrito = [];

// Elementos del DOM
const contenedorCarrito = document.querySelector("#contenedor-carrito");
const resumenCarrito = document.querySelector("#resumen-carrito");
const totalCarrito = document.querySelector("#total-carrito");
const botonPagar = document.querySelector("#boton-pagar");

// Función para agregar al carrito
function agregarAlCarrito(nombre, precio) {
    const itemExistente = carrito.find(item => item.nombre === nombre);

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    actualizarCarrito();
}

// Función para actualizar el carrito
function actualizarCarrito() {
    contenedorCarrito.innerHTML = ""; // Limpiar el contenido anterior

    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;

        const elemento = document.createElement("div");
        elemento.classList.add("item-carrito");
        elemento.innerHTML = `
      <p>${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}</p>
    `;

        contenedorCarrito.appendChild(elemento);
    });

    // Actualizar total
    totalCarrito.textContent = `$${total.toFixed(2)}`;

    // Mostrar el botón de pagar si hay elementos en el carrito
    botonPagar.style.display = carrito.length > 0 ? "block" : "none";
}

// Evento para el botón de pagar
botonPagar.addEventListener("click", () => {
    // Redirigir a PayPal
    window.location.href = "https://www.paypal.com/";
});

// Inicializar botones de compra
const botonesCompra = document.querySelectorAll(".button");
botonesCompra.forEach(boton => {
    boton.addEventListener("click", () => {
        const nombre = boton.dataset.nombre;
        const precio = parseFloat(boton.dataset.precio);
        agregarAlCarrito(nombre, precio);
    });
});
