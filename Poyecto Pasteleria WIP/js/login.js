function validarLogin() {
    const email = document.getElementById('emailLogin').value;
    const clave = document.getElementById('claveLogin').value;
    const mensajesDiv = document.getElementById('mensajesLogin');

    mensajesDiv.innerHTML = "";

    if (email.trim() === "" || clave.trim() === "") {
        mensajesDiv.innerHTML = '<div class="alert alert-danger">⚠️ Completa todos los campos.</div>';
    } else if (email === "admin@dulce.com" && clave === "1234") {
        mensajesDiv.innerHTML = '<div class="alert alert-success">¡Bienvenido! Redirigiendo...</div>';
        setTimeout(() => { window.location.href = "index.html"; }, 1500);
    } else {
        mensajesDiv.innerHTML = '<div class="alert alert-danger">Usuario o clave incorrectos.</div>';
    }
}