var productArray = {};
var commentArray = [];
var relatedproductsArray = [];



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productArray = resultObj.data;
            let product = productArray;

            let productNameHTML = document.getElementById("categoryName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCount = document.getElementById("productsSoldCount")
            let productCategory = document.getElementById("productCategory")

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = `Costo: ` + product.cost + ` ` + product.currency;
            productSoldCount.innerHTML = `Cantidad Vendidos: ` + product.soldCount;
            productCategory.innerHTML = `Categoría: ` + product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }

        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                commentArray = resultObj.data;
                showComments(commentArray);
            }

            getJSONData(PRODUCTS_URL).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    relatedproductsArray = resultObj.data;
                    showRelatedProducts(relatedproductsArray, productArray.relatedProducts);
                }
            });
        });
    });
});

function showImagesGallery(productArray) {

    let htmlContentToAppend = "";

    for (let i = 0; i < productArray.length; i++) {
        let imageSrc = productArray[i];

        htmlContentToAppend += `
        <div class="col-sm mx-1">
            <div class=" mb-4 mx-0 h-100">
                <img class="img-fluid img-thumbnail rounded" cursor="pointer" src="` + imageSrc + `" onclick="myFunction(this);">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function myFunction(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("expandedImg");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
}


function showComments(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let comment = array[i];

        if (comment.score == "1") {

            htmlContentToAppend +=
                `<div id="lindo">
        <p class="h6 my-0"><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></p>
        <blockquote class="blockquote text-right my-0">
        <p class="comentario my-0 pr-5"><em>" `+ comment.description + `"</em></p>
        <footer class="blockquote-footer pt-0 pb-0">`+ comment.user + ` - <cite title="Source Title"> ` + comment.dateTime + `</cite></footer>
        </blockquote>
        
        </div>
        <br>
        `}
        else if (comment.score == "2") {

            htmlContentToAppend +=
                `<div id="lindo">
            <p class="h6 my-0"> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></p>
            <blockquote class="blockquote text-right my-0">
            <p class="comentario my-0 pr-5"><em>" `+ comment.description + `"</em></p>
            <footer class="blockquote-footer pt-0 pb-0">`+ comment.user + ` - <cite title="Source Title"> ` + comment.dateTime + `</cite></footer>
            </blockquote>
            
            </div>
            <br>
            `}
        else if (comment.score == "3") {

            htmlContentToAppend +=
                `<div id="lindo">
            <p class="h6 my-0"><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></p>
            <blockquote class="blockquote text-right my-0">
            <p class="comentario my-0 pr-5"><em>" `+ comment.description + `"</em></p>
            <footer class="blockquote-footer pt-0 pb-0">`+ comment.user + ` - <cite title="Source Title"> ` + comment.dateTime + `</cite></footer>
            </blockquote>
            
            </div>
            <br>
            `}
        else if (comment.score == "4") {

            htmlContentToAppend +=
                `<div id="lindo">
            <p class="h6 my-0"><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span></p>
            <blockquote class="blockquote text-right my-0">
            <p class="comentario my-0 pr-5"><em>" `+ comment.description + `"</em></p>
            <footer class="blockquote-footer pt-0 pb-0">`+ comment.user + ` - <cite title="Source Title"> ` + comment.dateTime + `</cite></footer>
            </blockquote>
            
            </div>
            <br>
            `}
        else if (comment.score == "5") {

            htmlContentToAppend +=
                `<div id="lindo">
                <p class="h6 my-0"><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></p>
                <blockquote class="blockquote text-right my-0">
                <p class="comentario my-0 pr-5"><em>" `+ comment.description + `"</em></p>
                <footer class="blockquote-footer pt-0 pb-0">`+ comment.user + ` - <cite title="Source Title"> ` + comment.dateTime + `</cite></footer>
                </blockquote>
                
                </div>
                <br>
                `}
    }

    document.getElementById("commentbox").innerHTML = htmlContentToAppend;

}

var radios = "";

document.getElementById("radio5").addEventListener("click", function estrella1() {
    radios = 1;
})
document.getElementById("radio4").addEventListener("click", function estrella1() {
    radios = 2;
})
document.getElementById("radio3").addEventListener("click", function estrella1() {
    radios = 3;
})
document.getElementById("radio2").addEventListener("click", function estrella1() {
    radios = 4;
})
document.getElementById("radio1").addEventListener("click", function estrella1() {
    radios = 5;
})


document.getElementById("enviarComentario").addEventListener("click", function () {

    let comentario = document.getElementById("exampleInputPassword1");
    let camposCompletos = true;
    var hoy = new Date();
    var fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechayHora = fecha + ' ' + hora;
    var newComment = Object();
    newComment.score = radios;
    newComment.description = document.getElementById("exampleInputPassword1").value;
    newComment.user = JSON.parse(localStorage.getItem('user-logged')).email;
    newComment.dateTime = fechayHora;

    if (comentario.value === "") {
        camposCompletos = false;
    };

    if (radios === "") {
        camposCompletos = false;
    };

    if (camposCompletos) {
        commentArray.push(newComment);
        showComments(commentArray);
    } else {
        alert("Debes rellenar los campos!");
    };
});

function showRelatedProducts(arrayListado, arrayRelacionados) {
    let contenido = "";
    arrayRelacionados.forEach(function (i) {
        contenido += 
        `<div class="card p-2 mx-2 mt-2">
         <img src="` + arrayListado[i].imgSrc + `" style="width:100%">
         <h1>`+ arrayListado[i].name + `</h1>
         <p class="price">` + arrayListado[i].cost + ` ` + arrayListado[i].currency + `</p>
         <p><button>Ver Producto</button></p>
        </div>
        
        `
    });

    document.getElementById("Relacionados").innerHTML = contenido;
};