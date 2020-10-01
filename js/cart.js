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
        <div class="col-3">
        <img src="` + carrito.src + `" class="img-thumbnail">
        </div>

        `
    }
};