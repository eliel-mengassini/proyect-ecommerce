function activateButton() {
    if (document.getElementById("inputEmail").value!="" &&
        document.getElementById("inputPassword").value!=""){
        document.getElementById("button").innerHTML= disabled=false;
    } else {

    }
}

function redirect() {
    location.replace("https://eliel-mengassini.github.io/proyect-ecommerce/home.html");
}