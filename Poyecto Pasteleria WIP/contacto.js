function enviarMensaje() {
    // Capturar los campos
    const nombre = document.getElementById('nombreCompleto').value.trim();
    const correo = document.getElementById('correoContacto').value.trim();
    const mensaje = document.getElementById('contenidoMensaje').value.trim();
    const divMensajes = document.getElementById('mensajesContacto');

    // Limpiar mensajes anteriores
    divMensajes.innerHTML = "";
    divMensajes.className = "mb-3 text-center";

    // Validación básica
    if (nombre === "" || correo === "" || mensaje === "") {
        divMensajes.innerHTML = '<span style="color: red;">⚠️ Por favor, completa todos los campos.</span>';
        return;
    }

    // Validación de correo simple
    if (!correo.includes("@") || !correo.includes(".")) {
        divMensajes.innerHTML = '<span style="color: red;">⚠️ El correo no parece válido.</span>';
        return;
    }

    // Simulación de envío exitoso
    divMensajes.innerHTML = '<span style="color: green;">✨ ¡Gracias por escribirnos! Te contactaremos pronto.</span>';
    
    // Opcional: Limpiar el formulario después del éxito
    document.getElementById('formContacto').reset();
}