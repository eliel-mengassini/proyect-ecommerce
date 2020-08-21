const USUARIOS_URL = "https://eliel-mengassini.github.io/proyect-ecommerce/js/usuarios.json";

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

var usersArray = [];

function validateUser(usersArray, userIn, passwordIn) { 
    for (let i = 0; i < usersArray.length; i++) {
        let usuario = usersArray[i];
        if (usuario.name == userIn && usuario.password == passwordIn){
            return true;
        }
        else{
            return false;
        }
    }
    
} 

document.addEventListener("DOMContentLoaded", function(e){

    document.getElementById("submitBtn").addEventListener("click", function(e) {

        let inputUser = document.getElementById("inputUser");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true;
        
        if (inputUser.value === "") {
            inputUser.classList.add("invalid");
            camposCompletos = false;
        }

        if (inputPassword.value === ""){
            inputPassword.classList.add("invalid");
            camposCompletos = false;
        }

        if (camposCompletos) {

            getJSONData2(USUARIOS_URL).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    usersArray = resultObj.data;
        
                    if ( validateUser(usersArray, inputUser.value, inputPassword.value) ){
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
