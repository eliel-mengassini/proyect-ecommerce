var cartArray = [];
var buyArray = [];

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray = resultObj.data.articles;
            showCartList(cartArray);
            calcTotal();
        }
    });

    getJSONData(CART_BUY_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            buyArray = resultObj.data;
        }
    });


});

calcEnvio();

function calcTotal() {
    let total = 0;
    let subs = document.getElementsByClassName("subtotal");
    for (let i = 0; i < subs.length; i++) {
        total += parseInt(subs[i].innerHTML);
    }
    document.getElementById("total").innerHTML = `${total} USD`;
    calcEnvio();
}

function calcSubTotal(costo, i) {
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

        let precioEnDolares = "";

        if (carrito.currency === "UYU") {
            precioEnDolares = carrito.unitCost / 40;
        } else {
            precioEnDolares = carrito.unitCost;
        };



        let sub = precioEnDolares * carrito.count;

        contenido += `
        <tr>
          <td style="padding-left:10px; border-top-left-radius: 10px; border-bottom-left-radius: 10px;" ><img src="${carrito.src}" alt="${carrito.name}" style="width:90px" class="img-thumbnail"></td>
          <td style="padding-right: 40px; padding-left: 20px;">${carrito.name}</td>
          <td style="font-family: Arial, Helvetica, sans-serif;">${carrito.unitCost} ${carrito.currency}</td>
          <td id="cantidad" class=""><input style="width:40px; font-weight: bold; border-radius: 5px;" onchange="calcSubTotal(${precioEnDolares},${i})" id="cantidad${i}" type="number" value="${carrito.count}" min="1"></td>
          <td style="font-family: Arial, Helvetica, sans-serif;border-bottom-right-radius: 10px;"><span class="subtotal" id="carritosubtotal${i}">${sub}</span> USD</td>
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

function calcEnvio() {
    let total = parseInt(document.getElementById("total").innerHTML);
    let envio;
    let elementos = document.getElementsByName("envio");
    let costoEnvio = 0;
    let costoTotal = 0;
    let costoTotalpesos = 0;

    for (var i = 0; i < elementos.length; i++) {
        if (elementos[i].checked) {
            envio = parseInt(elementos[i].value);
        }
    }

    costoEnvio += (envio * total) / 100;
    document.getElementById("costoEnvio").innerHTML = `${costoEnvio} USD`;
    costoTotal += costoEnvio + total;
    document.getElementById("costoFinal").innerHTML = `${costoTotal} USD`;
    document.getElementById("totalmodal").innerHTML = `${costoTotal} `;
    costoTotalpesos += costoTotal * 40;
    document.getElementById("totalmodalpesos").innerHTML = `${costoTotalpesos} `;
    document.getElementById("totalmodal2").innerHTML = `${costoTotal} `;
    document.getElementById("totalmodalpesos2").innerHTML = `${costoTotalpesos} `;

}

/* validación form envío */

document.getElementById("procederAlpago").addEventListener("click", function procederalpago(e) {

    let calle = document.getElementById("calle");
    let numero = document.getElementById("numero");
    let esquina = document.getElementById("esquina");
    let pais = document.getElementById("depto");
    let camposCompletos = true;

    if (calle.value === "") {
        calle.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (numero.value === "") {
        numero.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (esquina.value === "") {
        esquina.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (pais.value === "Pais") {
        pais.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (camposCompletos) {
        $('#exampleModal').modal('show');

    } else {
        alert('Debes completar el formulario de "Dirección de envío"');
    }
});

document.getElementById("calle").addEventListener("input", function valid(e) {
    let calle = document.getElementById("calle");

    calle.classList.remove("is-invalid");
    calle.classList.add("is-valid");
});
document.getElementById("numero").addEventListener("input", function valid(e) {
    let numero = document.getElementById("numero");

    numero.classList.remove("is-invalid");
    numero.classList.add("is-valid");
});
document.getElementById("esquina").addEventListener("input", function valid(e) {
    let esquina = document.getElementById("esquina");

    esquina.classList.remove("is-invalid");
    esquina.classList.add("is-valid");
});
document.getElementById("depto").addEventListener("input", function valid(e) {
    let pais = document.getElementById("depto");

    pais.classList.remove("is-invalid");
    pais.classList.add("is-valid");
});


/* validación form modal pago con tarjeta */

document.getElementById("pagar").addEventListener("click", function pagar(e) {

    let nombre = document.getElementById("nombretarj");
    let numero = document.getElementById("numerotarj");
    let mes = document.getElementById("mes");
    let anio = document.getElementById("ano");
    let cvc = document.getElementById("card-cvc");
    let camposCompletos = true;

    if (nombre.value === "") {
        nombre.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (numero.value === "") {
        numero.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (mes.value === "Mes") {
        mes.classList.add("is-invalid");
        camposCompletos = false;

    }

    if (anio.value === "Ano") {
        anio.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (cvc.value === "") {
        cvc.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (camposCompletos) {
        $('#exampleModal').modal('hide');
        alert(buyArray.msg);


    } else {
        alert('Debes completar todos los campos!');
    }
});

document.getElementById("nombretarj").addEventListener("input", function valid(e) {
    let nombretarj = document.getElementById("nombretarj");

    nombretarj.classList.remove("is-invalid");
    nombretarj.classList.add("is-valid");
});

document.getElementById("numerotarj").addEventListener("input", function valid(e) {
    let numerotarj = document.getElementById("numerotarj");

    numerotarj.classList.remove("is-invalid");
    numerotarj.classList.add("is-valid");
});

document.getElementById("mes").addEventListener("input", function valid(e) {
    let mes = document.getElementById("mes");

    mes.classList.remove("is-invalid");
    mes.classList.add("is-valid");
});

document.getElementById("ano").addEventListener("input", function valid(e) {
    let ano = document.getElementById("ano");

    ano.classList.remove("is-invalid");
    ano.classList.add("is-valid");
});

document.getElementById("card-cvc").addEventListener("input", function valid(e) {
    let cardcvc = document.getElementById("card-cvc");

    cardcvc.classList.remove("is-invalid");
    cardcvc.classList.add("is-valid");
});


/* función que cierra modal1 y abre modal 2 */

document.getElementById("transBancaria").addEventListener("click", function banco(e) {

    $("#cerrarmodal").trigger("click"); 
    $('#exampleModal2').modal('show'); 

});

/* validación form modal pago con transferencia bancaria */

document.getElementById("pagar2").addEventListener("click", function banco(e) {

    let numero = document.getElementById("numerocuenta");
    let banco = document.getElementById("banco");
    let camposCompletos = true;

    if (numero.value === "") {
        numero.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (banco.value === "banco") {
        banco.classList.add("is-invalid");
        camposCompletos = false;
    }

    if (camposCompletos) {
        $('#exampleModal2').modal('hide');
        alert(buyArray.msg);


    } else {
        alert('Debes completar todos los campos!');
    }
});

document.getElementById("numerocuenta").addEventListener("input", function valid(e) {
    let numero = document.getElementById("numerocuenta");

    numero.classList.remove("is-invalid");
    numero.classList.add("is-valid");
});

document.getElementById("banco").addEventListener("input", function valid(e) {
    let banco = document.getElementById("banco");

    banco.classList.remove("is-invalid");
    banco.classList.add("is-valid");
});