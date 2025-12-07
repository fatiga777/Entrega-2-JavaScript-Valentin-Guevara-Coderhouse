let productos = [];

async function cargarProductos() {
  try {
    productsContainer.innerHTML = "<p>Cargando productos...</p>";

    const response = await fetch("./data/productos.json");

    if (!response.ok) {
      throw new Error("Error al cargar productos");
    }

    productos = await response.json();
    renderProductos(productos);
  } catch (err) {
    console.error(err);
    productsContainer.innerHTML =
      "<p>Error cargando productos. Intentá recargar la página.</p>";
  }
}

cargarProductos();

let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

let productsContainer = document.getElementById("products-container");

function renderProductos(productsArray) {
  productsContainer.innerHTML = "";
  productsArray.forEach((producto) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h4>USD ${producto.precio}</h4>
      <button class="productoAgregar" id="${producto.id}">Agregar</button>
    `;
    productsContainer.appendChild(card);
  });
  agregarAlCarrito();
}

function agregarAlCarrito() {
  const addButton = document.querySelectorAll(".productoAgregar");
  addButton.forEach((button) => {
    button.onclick = (e) => {
      const productId = parseInt(e.currentTarget.id);
      const selectedProduct = productos.find((prod) => prod.id === productId);

      const existe = cartProducts.find((prod) => prod.id === productId);

      if (existe) {
        existe.cantidad++;
      } else {
        cartProducts.push({ ...selectedProduct, cantidad: 1 });
      }

      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

      Swal.fire({
        icon: "success",
        title: "Producto agregado",
        timer: 1200,
        showConfirmButton: false,
      });

      mostrarCantidadTotal();
    };
  });
}

function mostrarCantidadTotal() {
  const contador = document.getElementById("cart-count");
  if (contador) {
    const total = cartProducts.reduce((acc, prod) => acc + prod.cantidad, 0);
    contador.textContent = total;
  }
}

mostrarCantidadTotal();
