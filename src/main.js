import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getNews } from './js/api';
import { newsTemplate } from './js/render';

const refs = {
  formREf: document.querySelector('.js-form'),
  galRef: document.querySelector('.js-gallery'),
  moreRef: document.querySelector('.more'),
  loaderRef: document.querySelector('.loader'),
};

let query;
let page;
let lastPage;

refs.formREf.addEventListener('submit', onSubmit);
refs.moreRef.addEventListener('click', onMore);

async function onSubmit(ev) {
  ev.preventDefault();
  page = 1;
  loaderOn();

  query = ev.target.elements.query.value.trim();

  if (!query) {
    showError('No query!');
    refs.galRef.innerHTML = '';
    return;
  }

  try {
    const data = await getNews(query, page);
    if (data.totalResults === 0) {
      showError('Sorry! No news for this query found.Try another search.');
    }
    lastPage = Math.ceil(data.totalResults / 10);
    refs.galRef.innerHTML = '';
    renderNews(data.articles);
  } catch {
    showError(data.message);
    lastPage = 0;
    refs.formREf.reset();
    refs.galRef.innerHTML = '';
  }
  loaderOff();
  checkMoreState();
}

async function onMore(ev) {
  ev.preventDefault();
  page += 1;
  loaderOn();
  const data = await getNews(query, page);

  renderNews(data.articles);
  loaderOff();
  checkMoreState();

  refs.formREf.reset();

  const height = refs.galRef.firstElementChild.getBoundingClientRect().height;

  scrollBy({
    behavior: 'smooth',
    top: height * 2,
  });
}
function renderNews(articles) {
  const markup = newsTemplate(articles);
  refs.galRef.insertAdjacentHTML('beforeend', markup);
}

function showMore() {
  refs.moreRef.classList.remove('hidden');
}

function hideMore() {
  refs.moreRef.classList.add('hidden');
}

function checkMoreState() {
  if (page >= lastPage) {
    hideMore();
  } else {
    showMore();
  }
}
function loaderOn() {
  refs.loaderRef.classList.remove('hidden');
}

function loaderOff() {
  refs.loaderRef.classList.add('hidden');
}
function showError(msg) {
  iziToast.error({
    title: 'Error!',
    message: msg,
    position: 'center',
  });
}
