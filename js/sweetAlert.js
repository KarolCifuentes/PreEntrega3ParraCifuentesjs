/*
REQUERIMIENTOS:

1. Realizar una promesa de descuento del 10% en todos los productos durante 10 segundos, 
2. despues utilizar el clearTimeout para cerrar la oferta.
3. despues de tener 5 productos en el carrito se arroja el alert de oferta y
    se empieza a contar los 10 segundos despues de confirmar el alert
*/


/*Alert de oferta*/
Swal.fire({
  title: 'OFERTA! Despues de tener 4 productos en el carrito tiene 10 segundos para tener el 10% de descuento sobre los productos del carrito',
  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  }
})





