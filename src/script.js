//Creacion de botones para abrir y cerrar navbar
const menuCloseButton = document.querySelector('.navegacion__cerrar');
const menuOpenButton = document.querySelector('.navegacion__bars');

menuCloseButton.addEventListener('click', () => {
  document.body.classList.toggle('show-mobile-menu');
  document.body.classList.toggle('efecto');
});

menuOpenButton.addEventListener('click', () => {
  document.body.classList.toggle('show-mobile-menu');
  document.body.classList.toggle('efecto');
});
