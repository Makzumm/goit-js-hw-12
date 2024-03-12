import { refs } from "./vars";
import { createMarkUp } from '/js/render-functions.js';
import { onClearHTMLFunc } from '/js/clearHtmlFunc.js';

import gallerySimpleLightbox from "./simplelightbox-init.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export async function onformEl(e, fetchImages) {
    e.preventDefault();

    fetchImages.query = refs.inputEl.value.trim();
    refs.inputEl.blur()

    if (fetchImages.query === '') {
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
        const data = await fetchImages.getImage(fetchImages.fetchedData);
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
            onClearHTMLFunc();
            refs.loadMoreButtonEl.classList.add('is-hidden');
            refs.loaderEl.classList.add('is-hidden');
            return;
        }

        refs.loaderEl.classList.add('is-hidden');
        fetchImages.pageToStartPosition();

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