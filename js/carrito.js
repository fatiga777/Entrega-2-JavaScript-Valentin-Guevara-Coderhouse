let carrito = JSON.parse(localStorage.getItem("cartProducts")) || [];
const carritoContainer = document.getElementById("carrito-container");
const totalPrecio = document.getElementById("total-precio");

const btnVaciar = document.getElementById("vaciar-carrito");
const btnFinalizar = document.getElementById("finalizar-compra");

function renderCarrito() {
  carritoContainer.innerHTML = "";

  if (carrito.length === 0) {
    carritoContainer.innerHTML = "<p>Tu carrito está vacío 😢</p>";
    totalPrecio.textContent = "0";
    return;
  }

  carrito.forEach((prod) => {
    const item = document.createElement("div");
    item.classList.add("carrito-item");

    let rutaImagen = prod.imagen;
    if (rutaImagen.startsWith("./")) {
      rutaImagen = "../" + rutaImagen.slice(2);
    } else if (
      !rutaImagen.startsWith("../") &&
      !rutaImagen.startsWith("http")
    ) {
      rutaImagen = "../" + rutaImagen;
    }

    item.innerHTML = `
      <img src="${rutaImagen}" alt="${prod.nombre}">
      <div class="carrito-info">
        <h3>${prod.nombre}</h3>
        <p>Precio: USD ${prod.precio}</p>
        <div class="cantidad">
          <button class="menos" data-id="${prod.id}">-</button>
          <span>${prod.cantidad}</span>
          <button class="mas" data-id="${prod.id}">+</button>
        </div>
        <p>Subtotal: USD ${(prod.precio * prod.cantidad).toFixed(2)}</p>
        <button class="eliminar" data-id="${prod.id}">Eliminar</button>
      </div>
    `;
    carritoContainer.appendChild(item);
  });

  actualizarTotal();
  agregarEventos();
}

function agregarEventos() {
  document.querySelectorAll(".mas").forEach((btn) => {
    btn.onclick = () => cambiarCantidad(btn.dataset.id, 1);
  });

  document.querySelectorAll(".menos").forEach((btn) => {
    btn.onclick = () => cambiarCantidad(btn.dataset.id, -1);
  });

  document.querySelectorAll(".eliminar").forEach((btn) => {
    btn.onclick = () => {
      Swal.fire({
        title: "¿Eliminar?",
        text: "¿Seguro que querés eliminar este producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          eliminarProducto(btn.dataset.id);
        }
      });
    };
  });
}

function cambiarCantidad(id, cambio) {
  const producto = carrito.find((p) => p.id == id);
  if (!producto) return;

  producto.cantidad += cambio;

  if (producto.cantidad <= 0) {
    carrito = carrito.filter((p) => p.id != id);
  }

  actualizarStorage();
  renderCarrito();
}

function eliminarProducto(id) {
  carrito = carrito.filter((p) => p.id != id);
  actualizarStorage();
  renderCarrito();
}

btnVaciar.onclick = () => {
  Swal.fire({
    title: "¿Vaciar carrito?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Vaciar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = [];
      actualizarStorage();
      renderCarrito();
    }
  });
};

btnFinalizar.onclick = () => {
  if (carrito.length === 0) {
    Swal.fire({
      title: "Carrito vacío",
      text: "No tenés productos en el carrito",
      icon: "info",
      confirmButtonText: "OK",
    });
    return;
  }

  Swal.fire({
    title: "¿Finalizar compra?",
    text: "Te redirigiremos a proceder al pago.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, finalizar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Orden Procesada",
        text: "¡Gracias por tu compra!",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      carrito = [];
      actualizarStorage();
      renderCarrito();
    }
  });
};

function actualizarTotal() {
  const total = carrito.reduce(
    (acc, prod) => acc + prod.precio * prod.cantidad,
    0
  );
  totalPrecio.textContent = total.toFixed(2);
}

function actualizarStorage() {
  localStorage.setItem("cartProducts", JSON.stringify(carrito));
}

renderCarrito();
