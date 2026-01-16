function validarRegistro() {
    // Captura de datos
    const nombre = document.getElementById('nombreRegistro').value.trim();
    const email = document.getElementById('emailRegistro').value.trim().toLowerCase();
    const edad = parseInt(document.getElementById('edadRegistro').value);
    const clave = document.getElementById('claveRegistro').value;
    const confirmarClave = document.getElementById('confirmarClaveRegistro').value;
    const codigo = document.getElementById('codigoPromo').value.trim().toUpperCase();
    
    const divMensajes = document.getElementById('mensajesRegistro');
    divMensajes.innerHTML = ""; // Limpiar mensajes previos

    // 1. Validaciones básicas de campos vacíos
    if (!nombre || !email || isNaN(edad) || !clave || !confirmarClave) {
        divMensajes.innerHTML = '<div class="alert alert-danger">⚠️ Todos los campos son obligatorios.</div>';
        return;
    }

    // 2. Validación de contraseñas
    if (clave.length < 8) {
        divMensajes.innerHTML = '<div class="alert alert-danger">⚠️ La contraseña debe tener al menos 8 caracteres.</div>';
        return;
    }
    if (clave !== confirmarClave) {
        divMensajes.innerHTML = '<div class="alert alert-danger">⚠️ Las contraseñas no coinciden.</div>';
        return;
    }

    // 3. Lógica de Beneficios Especiales
    let beneficios = [];

    // Regla: Mayores de 50 años (50% de descuento)
    if (edad > 50) {
        beneficios.push("✅ ¡Felicidades! Tienes un 50% de descuento en todos nuestros productos.");
    }

    // Regla: Código FELICES50 (10% de descuento de por vida)
    if (codigo === "FELICES50") {
        beneficios.push("✅ Código aplicado: Tienes un 10% de descuento de por vida.");
    }

    // Regla: Estudiantes Duoc (Torta gratis en cumpleaños)
    // Se asume el dominio institucional @duocuc.cl o @alumnos.duoc.cl
    if (email.endsWith("@duocuc.cl") || email.endsWith("@alumnos.duoc.cl")) {
        beneficios.push("✅ Usuario Duoc detectado: ¡Recibirás una torta gratis en tu cumpleaños!");
    }

    // 4. Resultado final
    if (beneficios.length > 0) {
        let listaBeneficios = beneficios.map(b => `<p class="mb-1">${b}</p>`).join("");
        divMensajes.innerHTML = `
            <div class="alert alert-success">
                <strong>✨ ¡Registro Exitoso!</strong><br>
                ${listaBeneficios}
            </div>`;
    } else {
        divMensajes.innerHTML = '<div class="alert alert-success">✨ ¡Registro exitoso! Bienvenido a Pastelería ¡Umai!.</div>';
    }

    // Aquí podrías agregar la redirección tras un tiempo si el registro es exitoso
    // setTimeout(() => { window.location.href = "LoginUsuario.html"; }, 3000);
}