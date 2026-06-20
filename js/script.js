function obtenerSaludoPorHora() {
  const horaActual = new Date().getHours();

  if (horaActual >= 6 && horaActual < 12) {
    return "Buenos días, bienvenido a SetupTech Store";
  }

  if (horaActual >= 12 && horaActual < 20) {
    return "Buenas tardes, bienvenido a SetupTech Store";
  }

  return "Buenas noches, bienvenido a SetupTech Store";
}

function mostrarMensajeBienvenida() {
  const mensajeBienvenida = document.getElementById("mensaje-bienvenida");

  if (mensajeBienvenida) {
    mensajeBienvenida.textContent = obtenerSaludoPorHora();
  }
}

function cambiarTema() {
  const botonTema = document.getElementById("boton-tema");

  document.body.classList.toggle("tema-oscuro");

  if (botonTema) {
    const modoOscuroActivo = document.body.classList.contains("tema-oscuro");
    botonTema.textContent = modoOscuroActivo ? "☀️ Activar modo claro" : "🌙 Activar modo oscuro";
  }
}

function mostrarError(idElemento, mensaje) {
  const elementoError = document.getElementById(idElemento);

  if (elementoError) {
    elementoError.textContent = mensaje;
  }
}

function limpiarError(idElemento) {
  mostrarError(idElemento, "");
}

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

function validarTerminos() {
  const terminos = document.getElementById("suscripcion-terminos");

  if (!terminos || !terminos.checked) {
    mostrarError("error-terminos", "Debes aceptar los términos.");
    return false;
  }

  limpiarError("error-terminos");
  return true;
}

function validarFormulario() {
  const nombreValido = validarNombre();
  const emailValido = validarEmail();
  const edadValida = validarEdad();
  const terminosValidos = validarTerminos();
  const formularioValido = nombreValido && emailValido && edadValida && terminosValidos;
  const botonSuscripcion = document.getElementById("boton-suscripcion");

  if (botonSuscripcion) {
    botonSuscripcion.disabled = !formularioValido;
  }

  return formularioValido;
}

function inicializarTema() {
  const botonTema = document.getElementById("boton-tema");

  if (botonTema) {
    botonTema.addEventListener("click", cambiarTema);
  }
}

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

  if (botonSuscripcion) {
    botonSuscripcion.disabled = true;
  }

  nombre.addEventListener("input", () => {
    if (mensajeExito) {
      mensajeExito.textContent = "";
    }
    validarFormulario();
  });

  email.addEventListener("input", () => {
    if (mensajeExito) {
      mensajeExito.textContent = "";
    }
    validarFormulario();
  });

  edad.addEventListener("input", () => {
    if (mensajeExito) {
      mensajeExito.textContent = "";
    }
    validarFormulario();
  });

  terminos.addEventListener("change", () => {
    if (mensajeExito) {
      mensajeExito.textContent = "";
    }
    validarFormulario();
  });

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    if (mensajeExito) {
      mensajeExito.textContent = "Suscripción realizada correctamente.";
    }

    formulario.reset();
    limpiarError("error-nombre");
    limpiarError("error-email");
    limpiarError("error-edad");
    limpiarError("error-terminos");

    if (botonSuscripcion) {
      botonSuscripcion.disabled = true;
    }
  });
}

function inicializarPagina() {
  mostrarMensajeBienvenida();
  inicializarTema();
  inicializarMenusDesplegables();
  inicializarFormulario();
}

document.addEventListener("DOMContentLoaded", inicializarPagina);
