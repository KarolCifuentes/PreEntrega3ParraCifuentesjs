const shopContent = document.getElementById('shopContent') //Obtengo el id del elemento
const verCarrito = document.getElementById('verCarrito')
const modalContainer = document.getElementById('modalContainer')
const cantidadCarrito = document.getElementById('cantidadCarrito') // Obtengo el id del elemnto span

let aceptoDescuento = false;
let canceloDescuento = false;


let carrito = /*JSON.parse(localStorage.getItem('carrito')) || */[]; // Array

const getProductos = async () => {
    const response = await fetch('data.json')
    const data = await response.json()
    // console.log(data)


    /*            product determina cada objeto       */
    data.forEach((product) => { /*Con forEach recorro el data*/
        let content = document.createElement("div");/*Crear un div que contenga la informacio del objeto*/
        content.className = "card";
        content.innerHTML = `
          <img src="${product.img}">
          <h3>${product.nombre}</h3>
          <p class="price">${product.precio}</p>
        `;

        shopContent.append(content); /*A shopContent con append le enlazo lo que tiene content <div><img src="${product.img}"><h3>${product.nombre}</h3><p class="price">${product.precio}</p><div>*/

        let comprar = document.createElement("button")/*Crear boton de comprar*/
        comprar.className = "comprar"
        comprar.innerText = "comprar"



        content.append(comprar);


        comprar.addEventListener('click', () => { /*Escucha el Clic al presionar en el boton comprar*/

            const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)/*repeatProduct respresenta todos los productos repetidos por id*/

            if (repeat)/*true*/ {
                carrito.map((produ) => { /*Recorro el carrito*/
                    if (produ.id === product.id) { /*Detecta el id de cada producto que esta en el carrito si es igual a product*/
                        produ.cantidad++ /*Sumar por id*/
                    }
                });
            } else {
                carrito.push({ /*Con el metodo push le pasamos lo que queremos agregar al carrito*/
                    id: product.id,
                    img: product.img,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: product.cantidad
                });
            }

            console.log(carrito);
            // saveLocal(); /*Localstroge*/
            carritoCounter(); /*Mostrar funcion de carritoCounter*/

        })

    })


}

getProductos()



