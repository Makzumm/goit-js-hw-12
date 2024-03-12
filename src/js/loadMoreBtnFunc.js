import { refs } from './vars';
import { createMarkUp } from '/js/render-functions.js';

import gallerySimpleLightbox from "./simplelightbox-init.js";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export async function onLoadMoreButtonEl(fetchImages) {
    fetchImages.increasePage();

    try {
        const searchQuery = refs.inputEl.value.trim();
        fetchImages.query = searchQuery;
        const response = await fetchImages.getImage(fetchImages.fetchedData);

        if (!response || !response.data || !response.data.hits || response.data.hits.length === 0) {
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
            return;
        }

        refs.galleryWrapperEl.insertAdjacentHTML('beforeend', createMarkUp(response.data.hits));

        gallerySimpleLightbox.refresh()

    } catch (error) {
        console.log(error)
    }
}