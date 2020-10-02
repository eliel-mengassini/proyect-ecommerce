var cartArray = [];

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray = resultObj.data;
            showCartList(cartArray);
        }
    });
});

function showCartList(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {

        let carrito = array[i];

        htmlContentToAppend += `
        <tr>
          <td><img src="${carrito.src}" alt="${carrito.name}" style="width:120px" class="img-thumbnail"></td>
          <td>${carrito.name}</td>
          <td id="cantidad" class="pr-3">cantidad<input id="cantidad" type="number" value="${carrito.count}"></td>
          <td>${carrito.currency} ${carrito.unitCost}</td>
        </tr>
        `
    }
    document.getElementById("carritoProductos").innerHTML = htmlContentToAppend;
};



