function validarRegistro() {
    const nombre = document.getElementById('nombreRegistro').value;
    const email = document.getElementById('emailRegistro').value;
    const clave = document.getElementById('claveRegistro').value;
    const mensajesDiv = document.getElementById('mensajesRegistro');

    mensajesDiv.innerHTML = "";

    if (nombre.trim() === "" || email.trim() === "" || clave.trim() === "") {
        mensajesDiv.innerHTML = '<div class="alert alert-danger">⚠️ Registre los campos solicitados.</div>';
    } else if (clave.length < 8) {
        mensajesDiv.innerHTML = '<div class="alert alert-warning">⚠️ La contraseña debe tener al menos 8 caracteres.</div>';
    } else {
        mensajesDiv.innerHTML = '<div class="alert alert-success">¡Registro exitoso! Ya puedes iniciar sesión.</div>';
        setTimeout(() => { window.location.href = "LoginUsuario.html"; }, 2000);
    }
}