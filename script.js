// Creamos un array de objetos con los productos disponibles
const productos = [
    { id: 1, nombre: 'Portillo Malbec', precio: 1000 },
    { id: 2, nombre: 'Portillo Dulce Natural', precio: 1200 },
    { id: 3, nombre: 'Portillo Cabernet', precio: 1400 },
    { id: 4, nombre: 'Portillo Rosado', precio: 1480 }
  ];
  
  // Creamos un array para almacenar los productos del carrito
  let carrito = [];
  
  // Obtenemos los elementos del DOM que vamos a utilizar
  const btnAgregar = document.querySelectorAll('.btn-agregar');
  const btnVaciar = document.getElementById('btn-vaciar');
  const btnComprar = document.getElementById('btn-comprar');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarrito = document.getElementById('total-carrito');
  
  // Agregamos un evento a cada botón de agregar para que se ejecute al hacer clic
  btnAgregar.forEach(btn => {
    btn.addEventListener('click', () => {
      // Obtenemos el id del producto a agregar
      const id = Number(btn.dataset.id);
  
      // Buscamos el producto en el array de productos disponibles
      const producto = productos.find(prod => prod.id === id);
  
      // Creamos un objeto con los valores obtenidos
      const item = { id, nombre: producto.nombre, precio: producto.precio };
  
      // Agregamos el objeto al array del carrito
      carrito.push(item);
  
      // Guardamos el array en localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
  
      // Actualizamos la lista del carrito y el total en el DOM
      actualizarListaCarrito();
      actualizarTotalCarrito();
    });
  });
  
  // Agregamos un evento al botón de vaciar para que se ejecute al hacer clic
  btnVaciar.addEventListener('click', () => {
    // Vaciamos el array del carrito
    carrito = [];
  
    // Borramos el carrito de localStorage
    localStorage.removeItem('carrito');
  
    // Actualizamos la lista del carrito y el total en el DOM
    actualizarListaCarrito();
    actualizarTotalCarrito();
  });
  
  // Agregamos un evento al botón de comprar para que se ejecute al hacer clic
  btnComprar.addEventListener('click', () => {
    // Simulamos la compra mostrando un mensaje de éxito y vaciando el carrito
    alert('Compra realizada con éxito!');
    carrito = [];
    
    // Borramos el carrito de localStorage
    localStorage.removeItem('carrito');
  
    // Actualizamos la lista del carrito y el total en el DOM
    actualizarListaCarrito();
    actualizarTotalCarrito();
  });
  
  // Función para actualizar la lista del carrito en el DOM
  function actualizarListaCarrito() {
    // Vaciamos la lista actual
    listaCarrito.innerHTML = '';
  
    // Recorremos el array del carrito y creamos un elemento li por cada producto
    carrito.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.nombre} - $${item.precio}`;
      listaCarrito.appendChild(li);
    });
  }
  
  // Función para actualizar el total del carrito en el DOM
  function actualizarTotalCarrito() {
    // Calculamos el total sumando los precios de todos los productos del carrito
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  
    // Mostramos el total en el elemento correspondiente del DOM
    totalCarrito.textContent = `$${total}`;
  }
  
  // Al cargar la página, verificamos si hay un array guardado en localStorage y lo cargamos si existe
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
  }
  
  // Actualizamos la lista del carrito y el total en el DOM al cargar la página
  actualizarListaCarrito();
  actualizarTotalCarrito();