import './sass/main.scss';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/PNotify.css';
import { alert, error } from '@pnotify/core';

import debounce from 'lodash.debounce';

import fetchCountries from './js/fetchCountries';
import getRefs from './js/getRefs';

import countryTemplate from './templates/country.hbs';
import countriesTemplate from './templates/countries.hbs';

const refs = getRefs();

refs.input.addEventListener('input', debounce(onInput, 500));
refs.button.addEventListener('click', onClickClear);

function onInput(event) {
  fetchCountries(event.target.value).then(render).catch(onFetchError);
}

function render(data) {
  if (data.length === 1) {
    renderCountryCard(data);
  } else if (data.length > 1 && data.length <= 10) {
    renderCountriesList(data);
  } else {
    clearMarkup();
    alert({
      // type: 'error',
      text: 'Too many matches found! Please enter a more specific query!',
      delay: '1000',
      maxTextHeight: null,
      width: '320px',
    });
  }
}

function renderCountryCard(country) {
  // console.log('это then');
  const countryMarkup = countryTemplate(country);
  refs.container.innerHTML = countryMarkup;
}

function renderCountriesList(countries) {
  const countriesMarkup = countriesTemplate(countries);
  refs.container.innerHTML = countriesMarkup;
}

function onClickCountryItem(event) {
  console.log(event);
}

function onClickClear() {
  refs.input.value = '';
  clearMarkup();
}

function onFetchError(err) {
  clearMarkup();
  error({
    text: `${err}`,
    delay: '1000',
    maxTextHeight: null,
    width: '320px',
  });
  // console.log('это ошибка');
  // console.log(err);
}

function clearMarkup() {
  refs.container.innerHTML = '';
}

/**
 * 1)
 *  .then(renderCountryCard) тоже самое (то есть сокращенный аналог)
 * что и   .then(country => renderCountryCard(country))
 * мы даем ссылку на эту функцию, чтобы она вызвалась тогда,
 *  когда придет ответ с сервера
 */
