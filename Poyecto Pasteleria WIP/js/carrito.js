let descuento = 0;

// ===============================
// CARRITO CON CANTIDADES
// ===============================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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
      cantidad: +1
    });
  }

  guardarCarrito();
  actualizarContador();
}

// ===============================
// ELIMINAR PRODUCTO
// ===============================
function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardarCarrito();
  actualizarContador();

  if (typeof mostrarCarrito === "function") {
    mostrarCarrito();
  }
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
    actualizarContador();
  }
  if (typeof mostrarCarrito === "function") {
    mostrarCarrito();
  }

}

// ===============================
// TOTAL
// ===============================
function obtenerTotal() {
  return carrito.reduce(
    (total, p) => total + p.precio * p.cantidad,
    0
  );
}

// ===============================
// CONTADOR (cantidad total)
// ===============================
function actualizarContador() {
  const contador = document.getElementById("cart-count");
  if (!contador) return;

  const totalItems = carrito.reduce(
    (total, p) => total + p.cantidad,
    0
  );

  contador.textContent = totalItems;
}

// ===============================
// VACIAR CARRITO
// ===============================
function limpiarCarrito() {
  carrito = [];
  guardarCarrito();
  actualizarContador();
}

function mostrarCarrito() {
  const carritoItems = document.getElementById("carrito-items");
  const totalSpan = document.getElementById("carrito-total");

  if (!carritoItems || !totalSpan) return;

  carritoItems.innerHTML = "";

  if (carrito.length === 0) {
    carritoItems.innerHTML =
      "<tr><td colspan='5'>El carrito está vacío</td></tr>";
    totalSpan.textContent = "$0";
    return;
  }

  carrito.forEach(producto => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toLocaleString("es-CL")} CLP</td>
      <td>
        <button onclick="cambiarCantidad('${producto.id}', ${producto.cantidad - 1})">−</button>
        ${producto.cantidad}
        <button onclick="cambiarCantidad('${producto.id}', ${producto.cantidad + 1})">+</button>
      </td>
      <td>
        $${(producto.precio * producto.cantidad).toLocaleString("es-CL")} CLP
      </td>
      <td>
        <button onclick="eliminarProducto('${producto.id}')">❌</button>
      </td>
    `;

    carritoItems.appendChild(fila);
  });

  const total = obtenerTotal();
  const totalConDescuento = total - total * descuento;

  totalSpan.textContent =
    "$" + totalConDescuento.toLocaleString("es-CL") + " CLP";
}
function aplicarCupon() {
  const input = document.getElementById("cupon-input");
  const mensaje = document.getElementById("mensaje-cupon");

  if (!input || !mensaje) return;

  const codigo = input.value.trim().toUpperCase();

  if (codigo === "FELICES50") {
    descuento = 0.10;
    mensaje.textContent = "Cupón aplicado: 10% de descuento 🎉";
    mensaje.style.color = "green";
  } else {
    descuento = 0;
    mensaje.textContent = "Cupón inválido ❌";
    mensaje.style.color = "red";
  }

  mostrarCarrito();
}
const btnVaciar = document.getElementById("btn-vaciar");

if (btnVaciar) {
  btnVaciar.addEventListener("click", () => {
    limpiarCarrito();
    mostrarCarrito();
  });
}
mostrarCarrito();
actualizarContador();
