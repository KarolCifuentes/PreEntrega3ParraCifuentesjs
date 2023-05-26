// Notificacion para ver las compras

const mostarCarrito = () => {
// verCarrito.addEventListener('click', () => {

    modalContainer.innerHTML = ""

    modalContainer.style.display = 'flex'

    const modalHeader = document.createElement('div') // modal header 
    modalHeader.className = 'modal-header'
    modalHeader.innerHTML = `
        <h1 class="modal-header-title"> Carrito. </h1>
    
    `
    modalContainer.append(modalHeader)


    const modalButton = document.createElement('button') // modal button
    modalButton.innerText = '❌'
    modalButton.className = 'class-header-button'

    modalButton.addEventListener('click', () => { // x de cerrar
        modalContainer.style.display = 'none'
    })

    modalHeader.append(modalButton)


    carrito.forEach((product) => {                       // Recorro el carrito
        let carritoContent = document.createElement('div')
        carritoContent.className = 'modal-content'
        carritoContent.innerHTML = `
         <img src="${product.img}">
         <h3>${product.nombre}</h3>
         <p>${product.precio}</p>
        
        `
        modalContainer.append(carritoContent)

        let eliminar = document.createElement('button') // crear boton de eliminar
        eliminar.innerText = '❌'
        eliminar.className = 'delete-product'
        carritoContent.append(eliminar) 

        eliminar.addEventListener('click', eliminarProducto)
    })
/*                                                                                      valor de arranque            */
    const total = carrito.reduce((acumulador, elProducto) => acumulador + elProducto.precio, 0)
    const totalBuying = document.createElement('div')
    totalBuying.className = 'total-content'
    totalBuying.innerHTML = `total a pagar: $${total}`
    
    modalContainer.append(totalBuying)

}


verCarrito.addEventListener("click", mostarCarrito);

const eliminarProducto = () => {
  const foundId = carrito.find((element) => element.id);

//   console.log(foundId);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });

  mostarCarrito();

};