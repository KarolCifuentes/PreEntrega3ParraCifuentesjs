// Notificacion para ver las compras

const mostarCarrito = () => {
  // verCarrito.addEventListener('click', () => {

  modalContainer.innerHTML = ""

  modalContainer.style.display = 'flex' /*le pasomos un display para que sea visible cerrar y abrir el modal*/

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
    modalContainer.style.display = 'none' /*Con el display none controlamos el elemento*/
  })

  modalHeader.append(modalButton)


  carrito.forEach((product) => {                       // Recorro el carrito
    let carritoContent = document.createElement('div')
    carritoContent.className = 'modal-content'
    carritoContent.innerHTML = `
         <img src="${product.img}">
         <h3>${product.nombre}</h3>
         <p>${product.precio}</p>
         <p>Cantidad: ${product.cantidad}</p>
         <p>Total: ${product.cantidad * product.precio}</p>
        
        `
    modalContainer.append(carritoContent)
    console.log(carrito.length) /*Recorremos el numero de elementos*/

    let eliminar = document.createElement('button') // crear boton de eliminar
    eliminar.innerText = '❌'
    eliminar.className = 'delete-product'
    carritoContent.append(eliminar)

    eliminar.addEventListener('click', eliminarProducto) /*Escicha el clic al presionar en la ❌ para elimiar el producto*/
  })
  /* valor de arranque            */

  /*if (aceptoDescuento == true){
    10% sobre todos los productos

  }else{
    Sume normal
  }*/

  let total;

  if(aceptoDescuento == true){
    console.log('Suma de productos con el 10% de descuentos')
    total = carrito.reduce((acumulador, elProducto) => acumulador + (elProducto.precio * 0.90) * elProducto.cantidad, 0)
  }else{          /*reduce((5, cervesa))*/
    console.log('Suma de productos sin descuento')
    total = carrito.reduce((acumulador, elProducto) => acumulador + elProducto.precio * elProducto.cantidad, 0) /**/
  }

  const totalBuying = document.createElement('div')
  totalBuying.className = 'total-content'
  totalBuying.innerHTML = `total a pagar: $${total}`

  modalContainer.append(totalBuying)

}

verCarrito.addEventListener("click", mostarCarrito);


const eliminarProducto = () => {
  const foundId = carrito.find((element) => element.id);/*Buscar en el carrito por id de elemento*/

  // carrito = carrito.filter((carritoId) => { /*Se filtra el carrito*/
  //   return carritoId !== foundId; /*Retorna todos los elementos que sean distintos al id que quiere eliminar*/
  // });

  Swal.fire({   /*Eleminar producto del carrito Alert de libreria*/
    title: 'Está seguro que desea eliminar el producto',
    text: "Eleminar",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Borrar'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
      });
      console.log('Eliminar')
      mostarCarrito();
      console.log('Actulizar')
      carritoCounter();/*Tambien muestra*/

    }

  })

};

/*Carrito muestra numero de productos*/
const carritoCounter = () => { /*funcion de carritoCounter de la clase carritoCounter*/

  cantidadCarrito.style.display = 'block'
  cantidadCarrito.innerText = carrito.length

  /*PROBLEMA A SOLUCIONAR*/
  /*Cuando llegue a 4 productos ya añadidos en el carrito, se muestra el alert. Sino, no sale el alert*/
  /*Si da al boton aceptar, se debe */

  /*COSAS PARA SOLUCIONAR EL PROBLEMA */
  /*Saber la cantidad de productos ya en el carrito*/



  /*SOLUCION DE PROBLEMA */

  if (carrito.length == 4) {
    // console.log('Ya tiene 4 productos en el carrito, si da aceptar tiene 10 segundos tener un descuentos del 10% de descuento en todos los pructos')

    if (aceptoDescuento == false) { /*Boton de aceptar*/

      if (canceloDescuento == false) {


        Swal.fire({ /*Advierte que ya tiene 4 productos en el carrito*/
          title: 'Ya tiene 4 productos en el carrito, si da aceptar tiene 10 segundos para tener un descuentos del 10% sobre todos los productos',
          showCancelButton: true,
          confirmButtonText: 'Aceptar Descuento',
          denyButtonText: 'Rechazar Descuento',
        }).then((result) => {

          if (result.isConfirmed) { /*Si da clic en el boton aceptar ingresa aqui*/
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 10000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: 'Compré todos los productos que pueda'
            })

            aceptoDescuento = true

            setTimeout(() => {
              console.log('Se acabo el tiempo de descuento')
              clearTimeout('Gracias por su compra')
              Swal.fire('Se acabo el tiempo de descuento')

            }, 10000)

            
            

          } else {
            Swal.fire('Seleccionó la opcion de cancelar') /*Sino da clic en el boton aceptar ingresa aqui y cancela*/

            aceptoDescuento = false
            canceloDescuento = true
          }

        })
      }
    }
  } else {
    // console.log('cancelar')
    // mostarCarrito();
    // Swal.fire('Seleccionó la opcion de Rechzar Descuento')

  }





}


