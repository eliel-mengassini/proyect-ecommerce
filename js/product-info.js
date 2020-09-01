var productArray = {};

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

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

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
    });
});

function myFunction(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("expandedImg");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
  }

