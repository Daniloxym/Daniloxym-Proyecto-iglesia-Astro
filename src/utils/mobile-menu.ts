//Creacion de botones para abrir y cerrar navbar
const menuCloseButton = document.querySelector('.navegacion__cerrar') as HTMLButtonElement;
const menuOpenButton = document.querySelector('.navegacion__bars') as HTMLButtonElement;

function toggleMenu() {
  document.body.classList.toggle('show-mobile-menu');
  document.body.classList.toggle('efecto');
}

menuCloseButton.addEventListener('click', toggleMenu);
menuOpenButton.addEventListener('click', toggleMenu);
