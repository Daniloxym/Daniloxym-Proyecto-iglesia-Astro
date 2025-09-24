//Creacion de botones para abrir y cerrar navbar
const menuCloseButton = document.querySelector('.navegacion__cerrar');
const menuOpenButton = document.querySelector('.navegacion__bars');

function toggleMenu() {
  document.body.classList.toggle('show-mobile-menu');
  document.body.classList.toggle('efecto');
}

menuCloseButton.addEventListener('click', toggleMenu);
menuOpenButton.addEventListener('click', toggleMenu);
