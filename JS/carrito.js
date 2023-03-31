    const pintarCarrito = () => {
    modalContainter.innerHTML = "";
    modalContainter.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Tu Carrito 🛒</h1>

    `;

    modalContainter.append(modalHeader);

    const modalbutton = document.createElement("div");
    modalbutton.className = "modal-header-button";
    modalbutton.innerHTML = `
    <i class='bx bxs-x-circle' ></i>
    `;

    modalbutton.addEventListener("click", () => {
        modalContainter.style.display = "none";
    });

    modalHeader.append(modalbutton);



    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>${product.precio} $</p>
        <i class='bx bxs-chevron-left' ></i>
        <p>Cantidad : ${product.cantidad}</p>
        <i class='bx bxs-chevron-right' ></i>
        <p class="cuenta-total">Total : ${product.cantidad * product.precio}</p>
        `;


    modalContainter.append(carritoContent);


    let restar = carritoContent.querySelector(".bxs-chevron-left");

    restar.addEventListener("click", () => {
        if(product.cantidad !== 1) {
            product.cantidad--;

        }
        saveLocal ();
        pintarCarrito();

    });

    let sumar = carritoContent.querySelector(".bxs-chevron-right");

    sumar.addEventListener("click", () => {
        if(product.cantidad !== 0) {
            product.cantidad++;

        }
        saveLocal ();
        pintarCarrito();

    });




    console.log(carrito.length);

        let eliminar = document.createElement("span");
        eliminar.innerText = "❌ ";
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto);
    });
 
  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `Total a pagar: ${total} $`;
  modalContainter.append (totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal ();
    pintarCarrito();
};


const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter ();
