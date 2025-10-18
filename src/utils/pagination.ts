import { predicas } from './constants';

const predicasLista = document.querySelector('.predicas__lista') as HTMLDivElement;
const paginationContainer = document.querySelector('.pagination') as HTMLDivElement;
const pageInfo = document.getElementById('page-info') as HTMLSpanElement;
const videoFrame = document.querySelector('.videoFrame') as HTMLIFrameElement;
const modal = document.querySelector('.modal') as HTMLDivElement;
const closeModal = document.querySelector('.close-btn') as HTMLSpanElement;

const itemsPerPage = 6;
let currentPage = 1;
const totalPages = Math.ceil(predicas.length / itemsPerPage);

function renderPreaches() {
  predicasLista.innerHTML = '';
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const preachesToDisplay = predicas.slice(start, end);

  preachesToDisplay.forEach((preach) => {
    const preachElement = document.createElement('div');
    preachElement.classList.add('predicas__item');
    preachElement.innerHTML = `
      <div style="background-image: url('${preach.thumbnail}')" class="predicas__thumbnail"></div>
      <h2 class="predicas__title">${preach.title}</h2>
      <div class="predicas__info"><p class="predicas__preacher">${preach.preacher}</p>
      <p class="predicas__date">${preach.date}</p></div>
    `;
    preachElement.onclick = () => openModal(preach.id);

    predicasLista.appendChild(preachElement);
  });
}

function setupPagination() {
  paginationContainer.innerHTML = '';

  const prevButton = document.createElement('button');
  prevButton.textContent = 'Anterior';
  prevButton.classList.add('pagination__button');
  prevButton.disabled = currentPage === 1;
  prevButton.onclick = () => {
    if (currentPage <= 1) return;
    currentPage--;
    renderPreaches();
    setupPagination();
  };
  paginationContainer.appendChild(prevButton);

  pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
  paginationContainer.appendChild(pageInfo);

  // for (let i = 1; i <= totalPages; i++) {
  //   const pageButton = document.createElement('button');
  //   pageButton.textContent = i.toString();
  //   pageButton.classList.add('pagination__button');
  //   pageButton.classList.toggle('active', i === currentPage);
  //   pageButton.addEventListener('click', () => {
  //     currentPage = i;
  //     renderPreaches();
  //     setupPagination();
  //   });
  //   paginationContainer.appendChild(pageButton);
  // }

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Siguiente';
  nextButton.classList.add('pagination__button');
  nextButton.disabled = currentPage === totalPages;
  nextButton.onclick = () => {
    if (currentPage >= totalPages) return;
    currentPage++;
    renderPreaches();
    setupPagination();
  };
  paginationContainer.appendChild(nextButton);
}

function openModal(videoId: string) {
  videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  modal.classList.add('active');
}

closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
  videoFrame.src = '';
});

setupPagination();
renderPreaches();
