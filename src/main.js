import { refs } from './js/vars.js';
import FetchImage from './js/pixaby-api.js';
import createMarkUp from './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const { loadMoreButtonEl, galleryWrapper, formEl, inputEl, loaderEl } = refs;
const fetchImg = new FetchImage()
const gallerySimpleLightbox = new SimpleLightbox('.gallery a');

inputEl.addEventListener('input', (e) => {
    fetchImg.fetchedData = e.target.value;
})

formEl.addEventListener('submit', onformEl)

async function onformEl(e) {
    e.preventDefault();
    fetchImg.query = e.currentTarget.elements.searchQuery.value.trim();
    inputEl.blur()

    if (fetchImg.query === '') {
        iziToast.info({
            position: 'topRight',
            message: 'Please, type something.'
        });
        e.target.reset();
        clearHTML();
        return
    }

    loaderEl.classList.remove('is-hidden');
    fetchImg.pageToStartPosition();

    try {
        const data = await fetchImg.getImage(fetchImg.fetchedData);
        console.log(data)
        if (!data.data || !data.data.hits || data.data.hits.length === 0) {
            iziToast.warning({
                position: 'topRight',
                maxWidth: '430px',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                messageSize: '16px',
                messageLineHeight: '24px',
                progressBarColor: '#B51B1B',
                color: '#EF4040',
                messageColor: "#ffffff",
            });
            clearHTML();
            loadMoreButtonEl.classList.add('is-hidden');
            loaderEl.classList.add('is-hidden');
            return;
        }

        loaderEl.classList.add('is-hidden');

        clearHTML();
        galleryWrapper.insertAdjacentHTML('beforeend', createMarkUp(data.data.hits));

        iziToast.success({
            position: 'topRight',
            message: `Hooray! We found ${data.data.totalHits} images.`,
        });

        if (!data.data.hits.length) {
            return [];
        } else {
            loadMoreButtonEl.classList.remove('is-hidden');
        }

        if (data.data.totalHits <= 20) {
            loadMoreButtonEl.classList.add('is-hidden');
        }

        gallerySimpleLightbox.refresh();

    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

inputEl.addEventListener('input', () => {
    const inputValue = inputEl.value.trim();
    if (inputValue === '') {
        fetchImg.pageToStartPosition();
        loadMoreButtonEl.classList.add('is-hidden');
        clearHTML();
    }
});

loadMoreButtonEl.addEventListener('click', onLoadMoreButtonEl);

async function onLoadMoreButtonEl(e) {
    fetchImg.increasePage();

    try {
        const response = await fetchImg.getImage(fetchImg.fetchedData);

        if (fetchImg.page === Math.ceil(response.data.total / 20)) {
            loadMoreButtonEl.classList.add('is-hidden');
            iziToast.info({
                position: 'topRight',
                maxWidth: '430px',
                message: 'Sorry, there are no more images!',
                messageSize: '16px',
                messageLineHeight: '24px',
                progressBarColor: '#B51B1B',
                color: '#EF4040',
                messageColor: "#ffffff",
            });
        }

        galleryWrapper.insertAdjacentHTML('beforeend', createMarkUp(response.data.hits));

        const gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
            captionsData: 'alt',
            captionDelay: 250
        });

        gallerySimpleLightbox.refresh();

    } catch (error) {
        console.log(error)
    }
}

function clearHTML() {
    galleryWrapper.innerHTML = '';
}
