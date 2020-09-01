const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_PROD_RELEVANCY = "Cant.";
var productArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
const form = document.querySelector("#formulario")
const buscadorBoton = document.querySelector("#searchButton");
const resultado = document.querySelector("#product-container")


function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_RELEVANCY) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductList() {

    let htmlContentToAppend = "";

    for (let i = 0; i < productArray.length; i++) {

        let category = productArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {


            htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
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
        </a>
        `
        }
        document.getElementById("product-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProduct(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        productArray = categoriesArray;
    }

    productArray = sortProducts(currentSortCriteria, productArray);

    //Muestro las categorías ordenadas
    showProductList();
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productArray = resultObj.data;
            showProductList(productArray);
        }
    });
    document.getElementById("sortAsc1").addEventListener("click", function () {
        sortAndShowProduct(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc1").addEventListener("click", function () {
        sortAndShowProduct(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount1").addEventListener("click", function () {
        sortAndShowProduct(ORDER_BY_PROD_RELEVANCY);
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

const filter = () => {
    resultado.innerHTML = '';
    const textSearched = form.value.toLowerCase();
    for (let product of productArray) {
        let car = product.name.toLowerCase();
        if (car.indexOf(textSearched) !== -1) {
            resultado.innerHTML += `
          <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row" action= href="product-info.html">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name + `</h4>
                        <p>`+ product.description + `</p>
                        </div>
                        <small class="text-muted">` + product.cost + ` ` + product.currency + `</small>
                    </div>

                </div>
            </div>
          </a>
        `

        }
    }

    if (resultado.innerHTML === '') {
        resultado.innerHTML += `
        <div>
        <p class="text-muted" align="left">No se encuentra el producto buscado</p>
        </div>
        `
    }
}
buscadorBoton.addEventListener('click', filter);
form.addEventListener('keyup', filter);
filter();