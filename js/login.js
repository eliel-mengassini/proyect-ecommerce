// en este array voy a guardar lo que se encuentre en el json
var usersArray = [];

//esta es la funcion que verificara que los datos que dio el ususario, se enc
function validateUser(array, userIn, passwordIn) { 
    for (let i = 0; i < array.length; i++) {
        let usuario = array[i];
        if (usuario.email == userIn && usuario.password == passwordIn){
            return true;
        }
    }

    return false;
} 



document.addEventListener("DOMContentLoaded", function(e){

    document.getElementById("submitBtn").addEventListener("click", function(e) {

        let inputEmail = document.getElementById("inputUser");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true;
        
        if (inputEmail.value === '') {
            inputEmail.classList.add("invalid");
            camposCompletos = false;
        }

        if (inputPassword.value === ''){
            inputPassword.classList.add("invalid");
            camposCompletos = false;
        }

        if (camposCompletos) {

            getJSONData(USUARIOS_URL).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    usersArray = resultObj.data;
        
                    if ( validateUser(usersArray, inputEmail.value, inputPassword.value) ){
                        window.location = "https://eliel-mengassini.github.io/proyect-ecommerce/home.html";
                    }else{
                        alert("Usuario o contraseña incorrectas!");
                    }
                }
            });

        }else{
            alert("Debes ingresar los datos!")
        }
    });
});