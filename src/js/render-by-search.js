import filmsTmpl from '../tamplates/search-films.hbs';


import FilmsApiService from '../js/films-service';
import { renderFullInfo } from './get-markup';
const refs = {
  searchForm: document.querySelector('.js-search-form'),
  filmContainer: document.querySelector('.js-main-content'),
  errorMsg: document.querySelector('.error-js'),
};

const filmsApiService = new FilmsApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  refs.errorMsg.classList.add('error-hidden');
  filmsApiService.query = e.currentTarget.elements.query.value;

  if (filmsApiService.query === '') {
    refs.errorMsg.classList.remove('hide');
    return;
  }
  refs.errorMsg.classList.add('hide');

  filmsApiService.resetPage();
  filmsApiService.fetchFilms().then(result => {
    clearFilmsContainer();
    appendFilmsMarkup(result);

    const mainWrapper = document.querySelector('.js-main-content')
    mainWrapper.addEventListener('click', event => {
      const id = event.target.dataset.id;
      if (id) {
        renderFullInfo(+id); // поставил "+" чтоб сразу к числу приводилось
      }
    });
  });
}

function appendFilmsMarkup(results) {
  refs.filmContainer.insertAdjacentHTML('beforeend', filmsTmpl(results));
}

function clearFilmsContainer() {
  refs.filmContainer.innerHTML = '';
}