let carrito = JSON.parse(localStorage.getItem("cartProducts")) || []
const carritoContainer = document.getElementById("carrito-container")
const totalPrecio = document.getElementById("total-precio")
const btnVaciar = document.getElementById("vaciar-carrito")

function renderCarrito() {
  carritoContainer.innerHTML = ""

  if (carrito.length === 0) {
    carritoContainer.innerHTML = "<p>Tu carrito está vacío 😢</p>"
    totalPrecio.textContent = "0"
    return
  }

  carrito.forEach(prod => {
    const item = document.createElement("div")
    item.classList.add("carrito-item")
    item.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
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
    `
    carritoContainer.appendChild(item)
  })

  actualizarTotal()
  agregarEventos()
}

function agregarEventos() {
  document.querySelectorAll(".mas").forEach(btn => {
    btn.onclick = () => cambiarCantidad(btn.dataset.id, 1)
  })
  document.querySelectorAll(".menos").forEach(btn => {
    btn.onclick = () => cambiarCantidad(btn.dataset.id, -1)
  })
  document.querySelectorAll(".eliminar").forEach(btn => {
    btn.onclick = () => eliminarProducto(btn.dataset.id)
  })
}

function cambiarCantidad(id, cambio) {
  const producto = carrito.find(p => p.id == id)
  if (!producto) return
  producto.cantidad += cambio

  if (producto.cantidad <= 0) {
    carrito = carrito.filter(p => p.id != id)
  }

  actualizarStorage()
  renderCarrito()
}

function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id != id)
  actualizarStorage()
  renderCarrito()
}

btnVaciar.onclick = () => {
  carrito = []
  actualizarStorage()
  renderCarrito()
}

function actualizarTotal() {
  const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
  totalPrecio.textContent = total.toFixed(2)
}

function actualizarStorage() {
  localStorage.setItem("cartProducts", JSON.stringify(carrito))
}

renderCarrito()
