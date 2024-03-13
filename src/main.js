import { refs } from './js/vars.js';
import { createMarkUp } from './js/render-functions.js'

import { FetchImage } from '/js/pixaby-api.js';
const fetchImg = new FetchImage();

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const gallerySimpleLightbox = new SimpleLightbox('.gallery a');

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let totalPhotoDisplayedCounter = 0;

refs.inputEl.addEventListener('input', onHandleInput);
refs.formEl.addEventListener('submit', onformEl);
refs.loadMoreButtonEl.addEventListener('click', onLoadMoreButtonEl);

function onHandleInput(event) {
    const inputValue = event.target.value.trim();
    if (inputValue === '') {
        fetchImg.pageToStartPosition();
        refs.loadMoreButtonEl.classList.add('is-hidden');
        onClearHTMLFunc();
    } else {
        fetchImg.fetchedData = inputValue;
    }
}

async function onformEl(e) {
    e.preventDefault();

    fetchImg.pageToStartPosition();
    fetchImg.query = refs.inputEl.value.trim();
    refs.inputEl.blur()

    if (fetchImg.query === '') {
        iziToast.info({
            position: 'topRight',
            message: 'Please, type something.'
        });
        e.target.reset();
        onClearHTMLFunc();
        return;
    }

    refs.loaderEl.classList.remove('is-hidden');

    try {
        const data = await fetchImg.getImage(fetchImg.fetchedData);
        console.log(data)
        if (!data.data || !data.data.hits || data.data.hits.length === 0) {
            iziToast.warning({
                ...refs.messageOptions,
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
            onClearHTMLFunc();
            refs.loadMoreButtonEl.classList.add('is-hidden');
            refs.loaderEl.classList.add('is-hidden');
            return;
        }

        refs.loaderEl.classList.add('is-hidden');
        onClearHTMLFunc();
        refs.galleryWrapperEl.insertAdjacentHTML('beforeend', createMarkUp(data.data.hits));

        iziToast.success({
            position: 'topRight',
            message: `Hooray! We found ${data.data.totalHits} images.`,
        });

        if (!data.data.hits.length) {
            return [];
        } else {
            refs.loadMoreButtonEl.classList.remove('is-hidden');
        }

        if (data.data.totalHits <= 20) {
            refs.loadMoreButtonEl.classList.add('is-hidden');
        }

        gallerySimpleLightbox.refresh();

    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

async function onLoadMoreButtonEl() {

    try {
        fetchImg.increasePage();

        const searchQuery = refs.inputEl.value.trim();
        fetchImg.query = searchQuery;
        const response = await fetchImg.getImage(fetchImg.fetchedData);

        if (!response || !response.data || !response.data.hits || response.data.hits.length === 0) {
            iziToast.info({
                ...refs.messageOptions,
                message: 'Sorry, there are no images!'
            });
            return;
        }

        refs.galleryWrapperEl.insertAdjacentHTML('beforeend', createMarkUp(response.data.hits));

        gallerySimpleLightbox.refresh()

        totalPhotoDisplayedCounter = refs.galleryWrapperEl.querySelectorAll('.photo-card').length;

        console.log(totalPhotoDisplayedCounter)

        if (totalPhotoDisplayedCounter >= response.data.totalHits) {
            refs.loadMoreButtonEl.classList.add('is-hidden');

            iziToast.info({
                ...refs.messageOptions,
                message: 'Sorry, there are no more images!'
            });
        }

    } catch (error) {
        console.log(error)
    }
}

function onClearHTMLFunc() {
    refs.galleryWrapperEl.innerHTML = '';
}