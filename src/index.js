import './sass/main.scss';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/PNotify.css';
import { alert, error } from '@pnotify/core';

import getRefs from './js/getRefs.js';
import LoadMoreBtn from './js/components/load-more-btn.js';
import PixabayApiService from './js/apiService.js';

import imageTemplate from './templates/image.hbs';

const refs = getRefs();

const pixabayApiService = new PixabayApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]', // потому что в class LoadMoreBtn есть деструктуризация
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);
refs.clearButton.addEventListener('click', onClear);

// console.log(loadMoreBtn.refs.button);

function onSearch(event) {
  event.preventDefault();

  pixabayApiService.query = event.currentTarget.elements.query.value;

  if (pixabayApiService.query === '') {
    return alert({
      text: 'Type your query...',
      delay: '1000',
    });
  }

  if (pixabayApiService.query.trim() === '') {
    refs.input.value = '';
    return alert({
      text: 'Type your query...',
      delay: '1000',
    });
  }

  loadMoreBtn.show();
  refs.clearButton.classList.remove('is-hidden');
  pixabayApiService.resetPage();
  clearGallery();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  pixabayApiService.fetchImages().then(images => {
    // console.log(images);
    if (images.hits.length === 0) {
      loadMoreBtn.hide();
      return error({
        text: 'Nothing found...',
        type: 'info',
        delay: '1000',
      });
    }
    appendImageCardMarkup(images);
    loadMoreBtn.enable();
  });

  scroll();
  console.dir(scroll());
}

function appendImageCardMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imageTemplate(images));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function scroll() {
  loadMoreBtn.refs.button.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function onClear() {
  refs.gallery.innerHTML = '';
  loadMoreBtn.hide();
  refs.input.value = '';
  refs.clearButton.classList.add('is-hidden');
}
