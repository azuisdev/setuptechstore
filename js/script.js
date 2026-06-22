// Obtiene un saludo diferente según la hora actual del día.
function obtenerSaludoPorHora() {
  const horaActual = new Date().getHours();

  // Si es de mañana, devuelve el saludo de buenos días.
  if (horaActual >= 6 && horaActual < 12) {
    return "Buenos días, bienvenido a SetupTech Store";
  }

  // Si es de tarde, devuelve el saludo de buenas tardes.
  if (horaActual >= 12 && horaActual < 20) {
    return "Buenas tardes, bienvenido a SetupTech Store";
  }

  // Para el resto de horarios, devuelve el saludo de buenas noches.
  return "Buenas noches, bienvenido a SetupTech Store";
}

// Muestra el mensaje de bienvenida dentro del elemento correspondiente del HTML.
function mostrarMensajeBienvenida() {
  const mensajeBienvenida = document.getElementById("mensaje-bienvenida");

  if (mensajeBienvenida) {
    mensajeBienvenida.textContent = obtenerSaludoPorHora();
  }
}

// Cambia entre tema claro y oscuro al presionar el botón.
function cambiarTema() {
  const botonTema = document.getElementById("boton-tema");

  document.body.classList.toggle("tema-oscuro");

  // Actualiza el texto del botón según el tema que está activo.
  if (botonTema) {
    const modoOscuroActivo = document.body.classList.contains("tema-oscuro");
    botonTema.textContent = modoOscuroActivo ? "☀️ Activar modo claro" : "🌙 Activar modo oscuro";
  }
}

// Muestra un mensaje de error en el elemento indicado por su id.
function mostrarError(idElemento, mensaje) {
  const elementoError = document.getElementById(idElemento);

  if (elementoError) {
    elementoError.textContent = mensaje;
  }
}

// Limpia el mensaje de error de un campo.
function limpiarError(idElemento) {
  mostrarError(idElemento, "");
}

// Valida que el nombre tenga al menos 3 caracteres.
function validarNombre() {
  const nombre = document.getElementById("suscripcion-nombre");
  const valorNombre = nombre ? nombre.value.trim() : "";

  if (valorNombre.length < 3) {
    mostrarError("error-nombre", "El nombre debe tener al menos 3 caracteres.");
    return false;
  }

  limpiarError("error-nombre");
  return true;
}

// Valida que el correo tenga un formato correcto.
function validarEmail() {
  const email = document.getElementById("suscripcion-email");
  const valorEmail = email ? email.value.trim() : "";
  const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!expresionEmail.test(valorEmail)) {
    mostrarError("error-email", "Ingresa un correo válido.");
    return false;
  }

  limpiarError("error-email");
  return true;
}

// Valida que la edad ingresada sea un número y que sea mayor o igual a 18.
function validarEdad() {
  const edad = document.getElementById("suscripcion-edad");
  const valorEdad = edad ? Number(edad.value) : 0;

  if (!Number.isFinite(valorEdad) || valorEdad < 18) {
    mostrarError("error-edad", "Debes tener al menos 18 años.");
    return false;
  }

  limpiarError("error-edad");
  return true;
}

// Valida que el usuario haya aceptado los términos.
function validarTerminos() {
  const terminos = document.getElementById("suscripcion-terminos");

  if (!terminos || !terminos.checked) {
    mostrarError("error-terminos", "Debes aceptar los términos.");
    return false;
  }

  limpiarError("error-terminos");
  return true;
}

// Ejecuta todas las validaciones del formulario y activa o desactiva el botón.
function validarFormulario() {
  const nombreValido = validarNombre();
  const emailValido = validarEmail();
  const edadValida = validarEdad();
  const terminosValidos = validarTerminos();
  const formularioValido = nombreValido && emailValido && edadValida && terminosValidos;
  const botonSuscripcion = document.getElementById("boton-suscripcion");

  // Si todo es válido, el botón queda habilitado; si no, queda deshabilitado.
  if (botonSuscripcion) {
    botonSuscripcion.disabled = !formularioValido;
  }

  return formularioValido;
}

// Prepara el botón que permite cambiar el tema de la página.
function inicializarTema() {
  const botonTema = document.getElementById("boton-tema");

  if (botonTema) {
    botonTema.addEventListener("click", cambiarTema);
  }
}

// Configura los menús desplegables para que solo uno quede abierto a la vez.
function inicializarMenusDesplegables() {
  const menus = document.querySelectorAll(".nav-dropdown details");

  menus.forEach((menu) => {
    menu.addEventListener("toggle", () => {
      if (menu.open) {
        menus.forEach((otroMenu) => {
          if (otroMenu !== menu) {
            otroMenu.removeAttribute("open");
          }
        });
      }
    });
  });
}

// Prepara el formulario de suscripción y sus eventos.
function inicializarFormulario() {
  const formulario = document.getElementById("formulario-suscripcion");
  const nombre = document.getElementById("suscripcion-nombre");
  const email = document.getElementById("suscripcion-email");
  const edad = document.getElementById("suscripcion-edad");
  const terminos = document.getElementById("suscripcion-terminos");
  const botonSuscripcion = document.getElementById("boton-suscripcion");
  const mensajeExito = document.getElementById("mensaje-exito-suscripcion");

  if (!formulario) {
    return;
  }

  // Al cargar la página, el botón empieza deshabilitado.
  if (botonSuscripcion) {
    botonSuscripcion.disabled = true;
  }

  // Cada vez que cambia el nombre, se limpian mensajes de éxito y se valida.
  nombre.addEventListener("input", () => {
    if (mensajeExito) {
      mensajeExito.textContent = "";
    }
    validarFormulario();
  });

  // Cada vez que cambia el correo, se vuelve a validar el formulario.
  email.addEventListener("input", () => {
    if (mensajeExito) {
      mensajeExito.textContent = "";
    }
    validarFormulario();
  });

  // Cada vez que cambia la edad, se vuelve a validar el formulario.
  edad.addEventListener("input", () => {
    if (mensajeExito) {
      mensajeExito.textContent = "";
    }
    validarFormulario();
  });

  // Cuando se marca o desmarca términos, se vuelve a validar.
  terminos.addEventListener("change", () => {
    if (mensajeExito) {
      mensajeExito.textContent = "";
    }
    validarFormulario();
  });

  // Controla el envío del formulario para validar antes de mostrar éxito.
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    if (mensajeExito) {
      mensajeExito.textContent = "Suscripción realizada correctamente.";
    }

    formulario.reset();
    // Después de enviar, se limpian errores y el botón vuelve a deshabilitarse.
    limpiarError("error-nombre");
    limpiarError("error-email");
    limpiarError("error-edad");
    limpiarError("error-terminos");

    if (botonSuscripcion) {
      botonSuscripcion.disabled = true;
    }
  });
}

// Inicializa todas las funciones principales cuando la página está lista.
function inicializarPagina() {
  mostrarMensajeBienvenida();
  inicializarTema();
  inicializarMenusDesplegables();
  inicializarFormulario();
}

// Espera a que el HTML cargue antes de ejecutar el código principal.
document.addEventListener("DOMContentLoaded", inicializarPagina);
