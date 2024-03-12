import { refs } from './vars';;
import { FetchImage } from '/js/pixaby-api.js';
import { onClearHTMLFunc } from './clearHtmlFunc';
const fetchImg = new FetchImage();

export function onHandleInput(event) {
    const inputValue = event.target.value.trim();
    if (inputValue === '') {
        fetchImg.pageToStartPosition();
        refs.loadMoreButtonEl.classList.add('is-hidden');
        onClearHTMLFunc();
    } else {
        fetchImg.fetchedData = inputValue;
    }
}