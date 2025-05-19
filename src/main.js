import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = form.elements['search-text'];

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  caption: true,
  captionPosition: 'bottom',
  captionDelay: 250,
});

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) {
    iziToast.info({
      message: 'Будь ласка, введіть ключове слово!',
      position: 'topRight',
      timeout: 2000,
      backgroundColor: '#ffa000',
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(hits => {
      if (!hits.length) {
        iziToast.warning({
          title: 'Warning',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          timeout: 3000,
          backgroundColor: '#ef4040',
        });
        return;
      }
      createGallery(hits);
      lightbox.refresh();
      input.value = '';
    })
    .catch(() => {
      iziToast.error({
        title: 'Error',
        message: 'Сталася помилка. Спробуйте пізніше!',
        position: 'topRight',
        timeout: 3000,
        backgroundColor: '#ffa040',
      });
    })
    .finally(() => {
      hideLoader();
    });
});
