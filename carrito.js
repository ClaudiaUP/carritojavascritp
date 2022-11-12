const contenedorProductos=document.getElementById("contenedorProductos")

const listadoBulls = "nombreToros.json";

let productos;

fetch (listadoBulls)
   .then(respuesta => respuesta.json())
   .then((datos) => {
    productos = datos
    mostrarProductos(productos)
    console.log(contenedorProductos);
   })
    .catch (error => console.log(error))

  


//creo array carrito
let carrito = []

recoverFromLocalStorage()

//DOM


//funcion para mostrar productos
const mostrarProductos =() =>{
    productos.forEach((producto)=>{
        const card =document.createElement("div")
        card.classList.add("col-xl-3","col-md-6","col-xs-12")
        card.innerHTML=`
            <div class="card">
                <img src= "${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${producto.nombre} </h5>
                <p class="card-text">$ ${producto.precio} </p>
                <button class="btn colorBoton" id="boton${producto.id}">Agregar al Carrito</button>
                </div>
            </div>
        `
        contenedorProductos.appendChild(card)

        //agregar productos al carrito
        const boton = document.getElementById(`boton${producto.id}`)
        boton.addEventListener("click",()=> {
            agregarAlCarrito(producto.id)
        })
    })
}

const agregarAlCarrito= (id)=> {
    const producto = producto.find((producto)=>producto.id === id)
    const productoEnCarrito = carrito.find((producto)=>producto.id === id)
    if(productoEnCarrito){
        productoEnCarrito.cantidad++
    }
    else{
        carrito.push(producto)
        saveToLocalStorage()
        // localStorage.setItem("carrito",JSON.stringify(carrito))
    }
    calcularTotal ()
    mostrarProductos()
}


//  const agregarCarrito = (id)  => {
//     fetch(listadoBulls)
//      .then (respuesta =>  respuesta.json())
//      .then ((datos) => {
//          const listadoB = datos.find((listadoB) => listadoB.id === id)
//          const prodBull = carrito.find((listadoB) => listadoB.id === id)
//          if (prodBull) {
//              prodBull.cantidad++
//          }
//          else {
//              carrito.push(listadoB)
//              saveToLocalStorage()

//      }
//      calcularTotal()
//      mostrarProductos()
    
//      })

//      }







const contenedorCarrito=document.getElementById("contenedorCarrito")
const verCarrito=document.getElementById("verCarrito")
verCarrito.addEventListener("click", ()=> {
    mostrarCarrito()
})


const mostrarCarrito=()=>{
    contenedorCarrito.innerHTML=""
    carrito.forEach((producto)=>{
        const card =document.createElement("div")
        card.classList.add("col-xl-3","col-md-6","col-xs-12")
        card.innerHTML = `
            <div class="card">
                <img src= "${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${producto.nombre} </h5>
                <p class="card-text"> ${producto.precio} </p>
                <p class="card-text"> ${producto.cantidad} </p>
                <button class="btn colorBoton" id="eliminar${producto.id}">Elimiar Producto</button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card)

        //eliminar productos del carrito

        const boton=document.getElementById(`eliminar${producto.id}`)
        boton.addEventListener("click", ()=> {
            producto.cantidad=1
            eliminarDelCarrito (producto.id)
            saveToLocalStorage
            // localStorage.setItem("carrito",JSON.stringify(carrito))
        })
    })
    calcularTotal ()
}       


const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id)
    const indice = carrito.indexOf(producto)
    carrito.splice(indice,1)
    mostrarCarrito()

    saveToLocalStorage()
    // localStorage.setItem("carrito",JSON.stringify(carrito)) 
}

//vacias carrito de compras

const vaciarCarrito = document.getElementById("vaciarCarrito")
vaciarCarrito.addEventListener("click", ()=> {
    eliminarTodoElCarrito()

    localStorage.clear()
})

const eliminarTodoElCarrito=()=>{
    carrito.forEach((producto) =>{
        producto.cantidad=1
        carrito=[]
    mostrarCarrito()
    localStorage.clear()
    })
    
}

//total de la compra
const total=document.getElementById("total")
const calcularTotal = () => {
    let totalCompra = 0
    carrito.forEach((producto)=>{
        totalCompra += producto.precio * producto.cantidad
    })
    total.innerHTML = `$${totalCompra}`
}

// recuperar del localStorage
function recoverFromLocalStorage(){
    if (localStorage.getItem("carrito")){
        carrito=JSON.parse(LocalStorage.getItem("carrito"))
    }
}



// guardar del localStorage
function saveToLocalStorage(){
    localStorage.setItem("carrito",JSON.stringify(carrito))
}