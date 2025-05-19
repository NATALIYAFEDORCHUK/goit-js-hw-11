const gallery = document.querySelector('.gallery');
const loader = document.getElementById('global-loader');

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item"><a class="gallery-link" href="${largeImageURL}"><img class="gallery-img" src="${webformatURL}" alt="${tags}"></a>
  <ul class="gallery-list">
    <li class="gallery-list-item"><b>likes</b>${likes}</li>
  <li class="gallery-list-item"><b>views</b>${views}</li>
  <li class="gallery-list-item"><b>comments</b>${comments}</li>
  <li class="gallery-list-item"><b>downloads</b>${downloads}</li>
  </ul>
</li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-active');
}

export function hideLoader() {
  loader.classList.remove('is-active');
}
