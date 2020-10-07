var cartArray = [];

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray = resultObj.data;
            showCartList(cartArray);
            calcTotal();
        }
    });
});

calcEnvio();

function calcTotal(){
    let total = 0;
    let subs = document.getElementsByClassName("subtotal");
    for(let i=0; i< subs.length; i++){
        total += parseInt(subs[i].innerHTML);
    }
    document.getElementById("total").innerHTML = `${total} USD`;
    calcEnvio();
}

function calcSubTotal(costo, i){
    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    subtotal = cantidad * costo;
    document.getElementById(`carritosubtotal${i}`).innerHTML = subtotal;
    calcTotal();
};

function showCartList(array) {

    let contenido = `<tr>
    <th></th>
    <th style="padding-left:10px; border-top-left-radius: 10px; border-bottom-left-radius: 10px;" class="th1">Producto</th>
    <th class="th1">Costo</th>
    <th class="th1">Cantidad </th>
    <th style="border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding-right:10px;" class="th1">Costo total </th>
    </tr>
    <tr><td class="bg-light"></td></tr>
    <tr><td class="bg-light"></td></tr>`;

    for (let i = 0; i < array.length; i++) {

        let carrito = array[i];

        let sub = carrito.unitCost * carrito.count;

        contenido += `
        <tr>
          <td style="padding-left:10px; border-top-left-radius: 10px; border-bottom-left-radius: 10px;" ><img src="${carrito.src}" alt="${carrito.name}" style="width:90px" class="img-thumbnail"></td>
          <td style="padding-right: 40px; padding-left: 20px;">${carrito.name}</td>
          <td style="font-family: Arial, Helvetica, sans-serif;">${carrito.unitCost} USD</td>
          <td id="cantidad" class=""><input style="width:40px; font-weight: bold;" onchange="calcSubTotal(${carrito.unitCost},${i})" id="cantidad${i}" type="number" value="${carrito.count}" min="1"></td>
          <td style="font-family: Arial, Helvetica, sans-serif;border-bottom-right-radius: 10px;"><span class="subtotal" id="carritosubtotal${i}">${sub}</span> ${carrito.currency}</td>
          <td type="button" style="background-color: skyblue; border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding-right:10px;">
          <button type="button" class="btn btn hoverable" title="Eliminar" onclick="eliminar(${i})">
          <i id="elimButton" class="fas fa-trash-alt"></i></button></td>
        </tr>
        <tr><td class="bg-light"></td></tr>
        `
    }
    document.getElementById("carritoProductos").innerHTML = contenido;
};


function eliminar(i) {
    let procederApago = document.getElementById("procederAlpago");
    if (cartArray.length > 1) {
        cartArray.splice(i, 1);
        showCartList(cartArray);
    } else {
        document.getElementById("carritoProductos").innerHTML = `
        <h2 style="text-align: center; margin-top: 40px;">No hay productos en tu carrito</h2>`;
        procederApago.style = "display:none;"
    };
    calcTotal();
};

function calcEnvio(){
    let total = parseInt(document.getElementById("total").innerHTML);
    let envio;
    let elementos = document.getElementsByName("envio");
    let costoEnvio = 0;
    let costoTotal = 0;

    for(var i=0; i < elementos.length; i++) {
        if (elementos[i].checked){
            envio = parseInt(elementos[i].value);
        }
    }

    costoEnvio += (envio * total)/100;
    document.getElementById("costoEnvio").innerHTML = `${costoEnvio} USD`;

    costoTotal += costoEnvio + total;
    document.getElementById("costoFinal").innerHTML = `${costoTotal} USD`;

}