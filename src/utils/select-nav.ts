const pathName = window.location.pathname;
const links = document.querySelectorAll('.navegacion__link') as NodeListOf<HTMLAnchorElement>;

if (pathName.includes(''))
  document.addEventListener('DOMContentLoaded', () => {
    links.forEach((link) => {
      if (link.getAttribute('href') === pathName) {
        document
          .querySelector('.navegacion__link--active')
          ?.classList.remove('navegacion__link--active');
        link.classList.add('navegacion__link--active');
      }
    });

    if (pathName === '/pastores/' || pathName === '/diaconos/' || pathName === '/creencias/') {
      document.querySelector('.nosotros')?.classList.add('navegacion__link--active');
    }
  });
