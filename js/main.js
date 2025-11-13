const productos = [
  {
    id: 1,
    nombre: "Iphone 17 Pro Max 256GB (Plata)",
    imagen: "../images/iphone17promax256gb(silver).webp",
    precio: 1550
  },
  {
    id: 2,
    nombre: "Iphone 16 128GB (Negro)",
    imagen: "../images/iphone16(128gb)-negro.webp",
    precio: 1100
  },
  {
    id: 3,
    nombre: "Iphone 15 Pro Max 1TB (Blanco)",
    imagen: "../images/iphone15promax(1TB).jfif",
    precio: 1340
  },
  {
    id: 4,
    nombre: "Iphone 11 128GB (Rojo)",
    imagen: "../images/iphone11(128gb)rojo.jfif",
    precio: 410
  },
  {
    id: 5,
    nombre: "Iphone 11 128GB (Blanco)",
    imagen: "../images/iphone11(128)blanco.jpg",
    precio: 430
  },
  {
    id: 6,
    nombre: "Cargador Portatil AppleCargador 20w Para Iphone + Cargador Portatil Battery Blanco",
    imagen: "../images/cargadorportatiliphone.jpg",
    precio: 30
  },
{
    id: 7,
    nombre: "Lavadora LG TurboWash 360™ 22 Kg",
    imagen: "../images/lavadora.avif",
    precio: 450
  },
]

let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || []

let productsContainer = document.getElementById("products-container")

function renderProductos(productsArray) {
  productsContainer.innerHTML = ""
  productsArray.forEach(producto => {
    const card = document.createElement("div")
    card.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h4>USD ${producto.precio}</h4>
      <button class="productoAgregar" id="${producto.id}">Agregar</button>
    `
    productsContainer.appendChild(card)
  })
  agregarAlCarrito()
}

renderProductos(productos)

function agregarAlCarrito() {
  const addButton = document.querySelectorAll(".productoAgregar")
  addButton.forEach(button => {
    button.onclick = (e) => {
      const productId = parseInt(e.currentTarget.id)
      const selectedProduct = productos.find(prod => prod.id === productId)

      const existe = cartProducts.find(prod => prod.id === productId)

      if (existe) {
        existe.cantidad++
      } else {
        cartProducts.push({ ...selectedProduct, cantidad: 1 })
      }

      localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
      console.log(cartProducts)

      mostrarCantidadTotal()
    }
  })
}

function mostrarCantidadTotal() {
  const contador = document.getElementById("cart-count")
  if (contador) {
    const total = cartProducts.reduce((acc, prod) => acc + prod.cantidad, 0)
    contador.textContent = total
  }
}

mostrarCantidadTotal()
