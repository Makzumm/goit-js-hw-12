import { refs } from './js/vars.js';
import FetchImage from './js/pixaby-api.js';
import createMarkUp from './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const { galleryWrapper, formEl, inputEl, loaderEl } = refs;
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
            loaderEl.classList.add('is-hidden');
            return;
        }

        loaderEl.classList.add('is-hidden');

        iziToast.success({
            position: 'topRight',
            message: `Hooray! We found ${data.totalHits} images.`,
        });

        galleryWrapper.insertAdjacentHTML('beforeend', createMarkUp(data.data.hits));
        gallerySimpleLightbox.refresh();

    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

inputEl.addEventListener('input', () => {
    const inputValue = inputEl.value.trim();
    if (inputValue === '') {
        clearHTML();
    }
});


function clearHTML() {
    galleryWrapper.innerHTML = '';
}
