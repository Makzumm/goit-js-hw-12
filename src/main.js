import { refs } from './js/vars.js';
import { onformEl } from './js/handlePromise.js';
import { onLoadMoreButtonEl } from './js/loadMoreBtnFunc.js';
import { onHandleInput } from './js/inputHandler.js';

import { FetchImage } from '/js/pixaby-api.js';
const fetchImages = new FetchImage();

refs.inputEl.addEventListener('input', onHandleInput);

refs.formEl.addEventListener('submit', onformEl);

refs.loadMoreButtonEl.addEventListener('click', onLoadMoreButtonEl);


