const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";


var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
};

document.addEventListener("DOMContentLoaded", function (e) {

  let userlogged = localStorage.getItem("user-logged");
  let infouser = document.getElementById("info-user");
  let user = document.getElementById("user");
  let comentarForm = document.getElementById("comentarForm");
  let preguntaCom = document.getElementById("pregComentario");
  

  if (userlogged) {
    userlogged = JSON.parse(userlogged);
    user.innerText = user.innerText + userlogged.email;
    infouser.style = "display:inline-block";
    comentarForm.style = "display:inline-block";
    preguntaCom.innerHTML = `Déja un comentario...`;
  }
});




document.getElementById("cerrarSesion").addEventListener("click", function sesionCerrada() {
  localStorage.removeItem("user-logged");
  localStorage.removeItem("perfilGuardado")
  window.location = "index.html";
});

