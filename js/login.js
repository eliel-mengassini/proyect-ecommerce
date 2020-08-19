// en este array voy a guardar lo que se encuentre en el json
var usersArray = [];
let inputName = document.getElementById("inputUser");
let inputPassword = document.getElementById("inputPassword");


//esta es la funcion que verificara que los datos que dio el ususario, se enc
function validateUser(usersArray, inputName, inputPassword) {
    for (let i = 0; i < usersArray.length; i++) {
        let usuario = array[i];
        if (inputName == usuario.name && inputPassword == usuario.password) {
            return true;
        }
        else {
            return false;
        }
    }
}

document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("submitBtn").addEventListener("click", function (e) {

        getJSONData(USUARIOS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                usersArray = resultObj.data;
            }
        });

        if (validateUser(usersArray, inputName.value, inputPassword.value)) {
            window.location = "https://eliel-mengassini.github.io/proyect-ecommerce/home.html";
        } else {
            alert("Usuario o contraseña incorrectas!");
        }




    });
});