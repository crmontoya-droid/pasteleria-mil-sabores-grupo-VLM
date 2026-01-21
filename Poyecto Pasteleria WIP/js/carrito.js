let descuentoPorcentaje = 0; // 0.10, 0.50, etc.

// ===============================
// CARRITO CON CANTIDADES
// ===============================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Al cargar la página, inicializamos
document.addEventListener("DOMContentLoaded", () => {
    if(document.getElementById("carrito-items")) {
        mostrarCarrito();
    }
    actualizarContador();
});

// ===============================
// GUARDAR CARRITO
// ===============================
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ===============================
// AGREGAR PRODUCTO
// ===============================
function agregarAlCarrito(producto) {
  const existente = carrito.find(p => p.id === producto.id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1
    });
  }

  guardarCarrito();
  actualizarContador();
  alert("Producto agregado: " + producto.nombre);
}

// ===============================
// ELIMINAR PRODUCTO
// ===============================
function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardarCarrito();
  actualizarContador();
  mostrarCarrito();
}

// ===============================
// CAMBIAR CANTIDAD
// ===============================
function cambiarCantidad(id, nuevaCantidad) {
  const producto = carrito.find(p => p.id === id);
  if (!producto) return;

  if (nuevaCantidad <= 0) {
    eliminarProducto(id);
  } else {
    producto.cantidad = nuevaCantidad;
    guardarCarrito();
    mostrarCarrito();
  }
}

// ===============================
// MOSTRAR CARRITO (Precio Final)
// ===============================
function mostrarCarrito() {
  const carritoItems = document.getElementById("carrito-items");
  if (!carritoItems) return; 

  carritoItems.innerHTML = "";

  let sumaTotal = 0;

  // 1. Generar filas
  carrito.forEach(producto => {
    const subtotalLinea = producto.precio * producto.cantidad;
    sumaTotal += subtotalLinea;

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td style="text-align: left;">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        ${producto.nombre}
      </td>
      <td>$${producto.precio.toLocaleString("es-CL")}</td>
      <td>
        <button onclick="cambiarCantidad('${producto.id}', ${producto.cantidad - 1})">−</button>
        <span style="margin: 0 10px;">${producto.cantidad}</span>
        <button onclick="cambiarCantidad('${producto.id}', ${producto.cantidad + 1})">+</button>
      </td>
      <td>
        $${subtotalLinea.toLocaleString("es-CL")}
      </td>
      <td>
        <button onclick="eliminarProducto('${producto.id}')" style="background:none; border:none; cursor:pointer;">❌</button>
      </td>
    `;
    carritoItems.appendChild(fila);
  });

  // 2. Cálculos Simples (Subtotal - Descuento = Total)
  const montoDescuento = sumaTotal * descuentoPorcentaje;
  const totalFinal = sumaTotal - montoDescuento;

  // 3. Actualizar HTML
  const subtotalSpan = document.getElementById("subtotal");
  const descuentoSpan = document.getElementById("descuento-monto");
  const totalSpan = document.getElementById("carrito-total");

  if(subtotalSpan) subtotalSpan.textContent = "$" + sumaTotal.toLocaleString("es-CL");
  
  if(descuentoSpan) {
      descuentoSpan.textContent = "-$" + montoDescuento.toLocaleString("es-CL");
      // Color verde si hay descuento
      descuentoSpan.parentElement.style.color = montoDescuento > 0 ? "green" : "#555";
  }

  if(totalSpan) totalSpan.textContent = "$" + totalFinal.toLocaleString("es-CL") + " CLP";
}

// ===============================
// CUPÓN
// ===============================
function aplicarCupon() {
  const input = document.getElementById("cupon-input");
  const mensaje = document.getElementById("mensaje-cupon");

  if (!input || !mensaje) return;

  const codigo = input.value.trim().toUpperCase();

  // Aquí definimos los cupones
  if (codigo === "FELICES50") {
    descuentoPorcentaje = 0.10; // 10%
    mensaje.textContent = "¡Cupón aplicado! 50% de descuento 🎉";
    mensaje.style.color = "green";
  } else if (codigo === "UMAI20") {
    descuentoPorcentaje = 0.20; // 20%
    mensaje.textContent = "¡Cupón aplicado! 10% de descuento 🎉";
    mensaje.style.color = "green";
  } else {
    descuentoPorcentaje = 0;
    mensaje.textContent = "Cupón inválido ❌";
    mensaje.style.color = "red";
  }

  // Recalcular inmediatamente
  mostrarCarrito();
}

// ===============================
// CONTADOR NAVBAR
// ===============================
function actualizarContador() {
  const countSpan = document.getElementById("cart-count");
  if (countSpan) {
    const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    countSpan.textContent = totalItems;
  }
}