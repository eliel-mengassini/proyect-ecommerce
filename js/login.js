document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("submitBtn").addEventListener("click", function (e) {

        let inputUser = document.getElementById("inputUser");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true;

        if (inputUser.value === "") {
            inputUser.classList.add("invalid");
            camposCompletos = false;
        }

        if (inputPassword.value === "") {
            inputPassword.classList.add("invalid");
            camposCompletos = false;
        }

        if (camposCompletos) {
            localStorage.setItem("user-logged", JSON.stringify({ email: inputUser.value }));
            window.location = "home.html";
            

        } else {
            alert("Debes ingresar los datos!")
        }
    });
});
