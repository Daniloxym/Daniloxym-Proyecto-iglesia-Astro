//Creacion de botones para abrir y cerrar navbar
const menuCloseButton = document.querySelector(".navegacion__cerrar");
const menuOpenButton = document.querySelector(".navegacion__bars");

menuCloseButton.addEventListener("click", () => {
  document.body.classList.toggle("show-mobile-menu");
  document.body.classList.toggle("efecto");
});

menuOpenButton.addEventListener("click", () => {
  document.body.classList.toggle("show-mobile-menu");
  document.body.classList.toggle("efecto");
});

/*ENVIO DE CORREO ELECTRONICO */

const formulario = document.querySelector(".formulario");
const mensajeRespuesta = document.querySelector(".formulario__confirmacion");

formulario.addEventListener("submit", async (e) => {
  
  e.preventDefault();
  const formData = new FormData(formulario);

  try {
    const res = await fetch("https://danilo.com.co/backend/enviar-correo.php", {
      method: "POST",
      body: formData,
    });

    const texto = await res.text();
    mensajeRespuesta.style.display = "block";
    mensajeRespuesta.style.color = "green"
   

  } catch (err) {
    mensajeRespuesta.style.display = "block";
    mensajeRespuesta.style.color = "red"
    mensajeRespuesta.textContent = "❌ Hubo un error al enviar el formulario.";
    console.error("Error al enviar el formulario:", err); // Ayuda para depurar
  }

  document.querySelector(".formulario__nombre").value= "";
  document.querySelector(".formulario__correo").value= "";
  document.querySelector(".formulario__tema").value= "";
  document.querySelector(".formulario_mensaje").value= "";

  setTimeout(() => {
    mensajeRespuesta.style.display = "none";
  },6000);

});