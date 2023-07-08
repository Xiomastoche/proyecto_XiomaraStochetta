// Creo un array para almacenar los productos del carrito
let carrito = [];

// Obtengo los elementos del DOM que voy a usar
const listaProductos = document.getElementById('lista-productos');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const btnVaciar = document.getElementById('btn-vaciar');
const btnComprar = document.getElementById('btn-comprar');
const mensaje = document.getElementById('mensaje');
const formComprar = document.getElementById('formComprar');

// Utilizo SweetAlert2 para mostrar un mensaje de confirmación al vaciar el carrito
btnVaciar.addEventListener('click', () => {
  Swal.fire({
    title: 'Estás seguro que deseas vaciar el carrito?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#72BA09',
    cancelButtonColor: '#7B7C7B',
    confirmButtonText: 'Sí'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = [];
      mostrarCarrito();
      Swal.fire(
        'Carrito vaciado',
        'El carrito se borró correctamente',
        'success'
      );
      mensaje.style.display = 'block';
    }
  });
});


// Función para mostrar los productos disponibles en el DOM
const mostrarProductos = async () => {
  try {
    // Obtengo los datos del archivo JSON utilizando fetch y async/await
    const response = await fetch('./productos.json');
    const data = await response.json();

    // Creo el HTML para cada producto y lo agrego a la lista de productos
    let html = '';
    data.forEach(producto => {
      html += `
        <div class="col-md-3">
          <div class="card border-dark border-opacity-50" style="max-width: 18rem;">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
              <h2 class="card-title fs-5">${producto.nombre}</h2>
              <p class="card-text">$${producto.precio}</p>
              <button class="btn btn-outline-dark rounded-0 btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
            </div>
          </div>
        </div>
      `;
    });
    listaProductos.innerHTML = html;
    

    // Agrego un evento a cada botón de agregar para que se ejecute al hacer clic
    const btnAgregar = document.querySelectorAll('.btn-agregar');
    btnAgregar.forEach(btn => {
      btn.addEventListener('click', () => {
        // Obtengo el id del producto a agregar
        const id = Number(btn.dataset.id);

        // Busco el producto en el array de productos disponibles
        const producto = data.find(prod => prod.id === id);

        // Creo un objeto con los valores obtenidos
        const item = { id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen, cantidad: 1 };

        // Busco si ya existe el producto en el carrito
        const existe = carrito.find(prod => prod.id === id);

        if (existe) {
          // Si ya existe, aumento la cantidad en 1
          existe.cantidad++;
        } else {
          // Si no existe, lo agrego al carrito
          carrito.push(item);
        }

        mostrarCarrito();
        mensaje.style.display = 'none';
      });
    });
  } catch (error) {
    Swal.fire({
      title: 'Error al cargar los productos',
      text: 'Ha ocurrido un error al cargar los productos.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
};


// Función para mostrar los productos del carrito en el DOM
const mostrarCarrito = () => {
  // Creo el HTML para cada producto del carrito y lo agrego a la lista del carrito
  let html = '';
  if (carrito.length === 0) { // si el carrito esta vacio, muestro el mensaje de carrito vacio
    mensaje.style.display = 'block';
  } else {
    mensaje.style.display = 'none';
  }
  carrito.forEach(producto => {
    html += `
      <li class="list-group-item">
        <img src="${producto.imagen}" width="50">
        ${producto.nombre} - $${producto.precio} x ${producto.cantidad}
        <button class="btn btn-danger rounded-0 btn-sm m-4 px-2 btn-eliminar" data-id="${producto.id}"> X </button>
      </li>
    `;
  });
  listaCarrito.innerHTML = html;

  // Calculo el total del carrito y lo muestro en el DOM
  const total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
  totalCarrito.innerText = total.toFixed(2);

  // Agrego un evento a cada botón de eliminar para que se ejecute al hacer clic
  const btnEliminar = document.querySelectorAll('.btn-eliminar');
  btnEliminar.forEach(btn => {
    btn.addEventListener('click', () => {
      // Obtengo el id del producto a eliminar
      const id = Number(btn.dataset.id);

      // Busco el índice del producto en el array del carrito
      const index = carrito.findIndex(prod => prod.id === id);

      // Elimino el producto del carrito
      carrito.splice(index, 1);

      mostrarCarrito();
    });
  });
};

// Agrego un evento al botón de comprar para que se ejecute al hacer clic
btnComprar.addEventListener('click', () => {
  // Obtengo los valores de los input del cliente
  const inputNombre = document.getElementById('inputNombre').value;
  const inputEmail = document.getElementById('inputEmail').value;

  // Verifico que los datos hayan sido completados correctamente
  if (inputNombre.trim() === '' || inputEmail.trim() === '') {
    Swal.fire(
      'Error',
      'Por favor, completa todos los datos requeridos',
      'error'
    );
  } else {
    // Muestro un mensaje al hacer clic en comprar utilizando SweetAlert2
    Swal.fire({
      title: 'Compra realizada con éxito!',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      carrito = [];
      mostrarCarrito();
    });
  }
});


// Muestro los productos disponibles en el DOM al cargar la página
mostrarProductos();

