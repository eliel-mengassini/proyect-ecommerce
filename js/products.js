var productArray = [];
var minCount = undefined;
var maxCount = undefined;

function showProductList(){

    let htmlContentToAppend = "";

    for (let i = 0; i < productArray.length; i++){

        let category = productArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {


            htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ category.name + `</h4>
                        <p>`+ category.description + `</p>
                        </div>
                        <small class="text-muted">` + category.cost + ` ` + category.currency + `</small>
                    </div>

                </div>
            </div>
        </div>
        `
        }
        document.getElementById("product-container").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productArray = resultObj.data;
            showProductList(productArray);
        }
    });
    document.getElementById("clearRangeFilter1").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin1").value = "";
        document.getElementById("rangeFilterCountMax1").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList();
    });

    document.getElementById("rangeFilterCount1").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin1").value;
        maxCount = document.getElementById("rangeFilterCountMax1").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductList();
    });
});

