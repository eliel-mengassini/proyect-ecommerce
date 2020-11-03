

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("guardarCambios").addEventListener("click", function (e) {
        let camposCompletos = true;
        let nombre3 = document.getElementById("nombrePerfil");
        let apellido3 = document.getElementById("apellidoPerfil");
        let edad3 = document.getElementById("edadPerfil");
        let email3 = document.getElementById("mailPerfil");
        let tel3 = document.getElementById("telPerfil");
        let img3 = document.getElementById("imagenPerfil");

        if (nombre3.value === "") {
            nombre3.classList.add("is-invalid");
            camposCompletos = false;
        }

        if (apellido3.value === "") {
            apellido3.classList.add("is-invalid");
            camposCompletos = false;
        }

        if (edad3.value === "") {
            edad3.classList.add("is-invalid");
            camposCompletos = false;
        }

        if (email3.value === "") {
            email3.classList.add("is-invalid");
            camposCompletos = false;
        }

        if (tel3.value === "") {
            tel3.classList.add("is-invalid");
            camposCompletos = false;
        }

        if (img3.value === "") {
            img3.classList.add("is-invalid");
            camposCompletos = false;
        }

        if (camposCompletos) {
            localStorage.setItem("perfilGuardado", JSON.stringify({ nombre: nombrePerfil.value, apellido: apellidoPerfil.value, edad: edadPerfil.value, email: mailPerfil.value, tel: telPerfil.value, img: imagenPerfil.value }));
            window.location = "my-profile.html";

        } else {
            alert('Debes completar todos los datos para guardar');
        }

    });

    let perfilNuevo = localStorage.getItem("perfilGuardado");
    let nombre = document.getElementById("nombre1");
    let edad = document.getElementById("edad1");
    let email = document.getElementById("email1");
    let tel = document.getElementById("tel1");
    let img = document.getElementById("userImage");


    if (perfilNuevo) {
        perfilNuevo = JSON.parse(perfilNuevo);
        nombre.innerHTML = ` ${perfilNuevo.nombre} ${perfilNuevo.apellido}`;
        edad.innerHTML = ` ${perfilNuevo.edad}`;
        email.innerHTML = ` ${perfilNuevo.email}`;
        tel.innerHTML = ` ${perfilNuevo.tel}`;
        img.src = perfilNuevo.img;
    }
});

document.getElementById("nombrePerfil").addEventListener("input", function valid(e) {
    let nombre3 = document.getElementById("nombrePerfil");

    nombre3.classList.remove("is-invalid");
    nombre3.classList.add("is-valid");
});
document.getElementById("apellidoPerfil").addEventListener("input", function valid(e) {
    let apellido3 = document.getElementById("apellidoPerfil");

    apellido3.classList.remove("is-invalid");
    apellido3.classList.add("is-valid");
});
document.getElementById("edadPerfil").addEventListener("input", function valid(e) {
    let edad3 = document.getElementById("edadPerfil");

    edad3.classList.remove("is-invalid");
    edad3.classList.add("is-valid");
});
document.getElementById("mailPerfil").addEventListener("input", function valid(e) {
    let email3 = document.getElementById("mailPerfil");

    email3.classList.remove("is-invalid");
    email3.classList.add("is-valid");
});

document.getElementById("telPerfil").addEventListener("input", function valid(e) {
    let tel3 = document.getElementById("telPerfil");

    tel3.classList.remove("is-invalid");
    tel3.classList.add("is-valid");
});

document.getElementById("imagenPerfil").addEventListener("input", function valid(e) {
    let img3 = document.getElementById("imagenPerfil");

    img3.classList.remove("is-invalid");
    img3.classList.add("is-valid");
});

