// ===============================
// REFERENCIAS AL DOM
// ===============================
const productGrid = document.getElementById("product-grid");
const categoryList = document.getElementById("category-list");

// ===============================
// MOSTRAR CATEGORÍAS
// ===============================
function mostrarCategorias() {
  categoryList.innerHTML = "";

  // Opción para ver todos
  const allItem = document.createElement("li");
  allItem.textContent = "Todas";
  allItem.addEventListener("click", () => {
    mostrarProductos(productos);
  });
  categoryList.appendChild(allItem);

  categorias.forEach(categoria => {
    const li = document.createElement("li");
    li.textContent = categoria;

    li.addEventListener("click", () => {
      const filtrados = productos.filter(
        producto => producto.categoria === categoria
      );
      mostrarProductos(filtrados);
    });

    categoryList.appendChild(li);
  });
}

// ===============================
// MOSTRAR PRODUCTOS
// ===============================
function mostrarProductos(listaProductos) {
  productGrid.innerHTML = "";

  listaProductos.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p class="price">$${producto.precio.toLocaleString("es-CL")} CLP</p>
      <div class="buttons">
        <button class="btn-add">Añadir</button>
        <button class="btn-detail">Ver detalle</button>
      </div>
    `;

    // BOTÓN AÑADIR AL CARRITO
    card.querySelector(".btn-add").addEventListener("click", () => {
      agregarAlCarrito(producto);
    });

    // BOTÓN VER DETALLE
    card.querySelector(".btn-detail").addEventListener("click", () => {
      window.location.href = `detalle.html?id=${producto.id}`;
    });

    productGrid.appendChild(card);
  });
}

// ===============================
// INICIALIZAR
// ===============================
mostrarCategorias();
mostrarProductos(productos);
actualizarContador();
