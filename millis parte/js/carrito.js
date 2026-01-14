// ===============================
// CARRITO (LocalStorage)
// ===============================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ===============================
// AGREGAR PRODUCTO AL CARRITO
// ===============================
function agregarAlCarrito(producto) {
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  alert(`"${producto.nombre}" agregado al carrito`);
}

// ===============================
// ACTUALIZAR CONTADOR
// ===============================
function actualizarContador() {
  const contador = document.getElementById("cart-count");
  if (contador) {
    contador.textContent = carrito.length;
  }
}

// ===============================
// OBTENER TOTAL (opcional)
// ===============================
function obtenerTotal() {
  return carrito.reduce((total, prod) => total + prod.precio, 0);
}

// ===============================
// LIMPIAR CARRITO (opcional)
// ===============================
function limpiarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito");
  actualizarContador();
}
