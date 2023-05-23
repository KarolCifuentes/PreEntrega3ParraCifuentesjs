const shopContent = document.getElementById('shopContent')
const verCarrito = document.getElementById('verCarrito')
const modalContainer = document.getElementById('modalContainer')

let carrito = JSON.parse(localStorage.getItem('carrito')) ||  [];

baseDeDatos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p class="price">${product.precio}</p>
    `;

    shopContent.append(content); // Conecto con el array baseDeDatos  

    let comprar = document.createElement('button')
    comprar.innerText = 'comprar'
    comprar.className = 'comprar'

    content.append(comprar);


    comprar.addEventListener('click', () => { // Anadir los productos al array carrito
        carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
        });

        console.log(carrito);
        saveLocal();
    })

})

// Notificacion para ver las compras

verCarrito.addEventListener('click', () => {

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
    })
/*                                                                                      valor de arranque            */
    const total = carrito.reduce((acumulador, elProducto) => acumulador + elProducto.precio, 0)
    const totalBuying = document.createElement('div')
    totalBuying.className = 'total-content'
    totalBuying.innerHTML = `total a pagar: $${total}`
    
    modalContainer.append(totalBuying)
})

