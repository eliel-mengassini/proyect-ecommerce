
const USUARIOS_URL = "https://eliel-mengassini.github.io/proyect-ecommerce/js/usuarios.json";
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

            // todo lo que viene a continuación, no se los pide el obligatorio, pero sirve para practicar
            // ustedes solo deben poner el window.location

            getJSONData2(USUARIOS_URL).then(function (resultObj) {
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


var getJSONData2 = function(url){
    var result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}