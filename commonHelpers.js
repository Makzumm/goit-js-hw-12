import{a as h,S as m,i as n}from"./assets/vendor-da186403.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function i(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(r){if(r.ep)return;r.ep=!0;const o=i(r);fetch(r.href,o)}})();const t={loadMoreButtonEl:document.querySelector(".load-more"),galleryWrapperEl:document.querySelector(".gallery"),formEl:document.querySelector("form#search-form"),inputEl:document.querySelector('input[type="text"]'),loaderEl:document.querySelector(".loader"),messageOptions:{position:"topRight",maxWidth:"430px",messageSize:"16px",messageLineHeight:"24px",progressBarColor:"#B51B1B",color:"#EF4040",messageColor:"#ffffff"}};function u(a){return a.map(i=>`
        <div class="photo-card">
            <a class="gallery__item" href="${i.largeImageURL}">
                    <img
                    class="photo"
                    src="${i.webformatURL}"
                    loading="lazy"
                    alt="${i.tags}"
                />
            </a>
            <div class="photo-card__info">
                <p class="photo-card__info--item">
                <b>Likes ${i.likes}</b>
                </p>
                <p class="photo-card__info--item">
                <b>Views ${i.views}</b>
                </p>
                <p class="photo-card__info--item">
                <b>Comments ${i.comments}</b>
                </p>
                <p class="photo-card__info--item">
                <b>Downloads ${i.downloads}</b>
                </p>
            </div>
        </div>
    `).join("")}class f{constructor(){this.page=1,this._searchQuery=""}async getImage(){const e="36626377-ec15308a2cdcc9d1051736749",l=`https://pixabay.com/api/?${new URLSearchParams({key:`${e}`,q:this.query,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:20,page:this.page})}`,r=await h.get(l);return r.status===404?[]:r}increasePage(){this.page+=1}pageToStartPosition(){this.page=1}get fetchedData(){return this._searchQuery}set fetchedData(e){this._searchQuery=e.trim()||""}}const s=new f,g=new m(".gallery a");let p=0;t.inputEl.addEventListener("input",y);t.formEl.addEventListener("submit",E);t.loadMoreButtonEl.addEventListener("click",L);function y(a){const e=a.target.value.trim();e===""?(s.pageToStartPosition(),t.loadMoreButtonEl.classList.add("is-hidden"),c()):s.fetchedData=e}async function E(a){if(a.preventDefault(),s.pageToStartPosition(),s.query=t.inputEl.value.trim(),t.inputEl.blur(),s.query===""){n.info({position:"topRight",message:"Please, type something."}),a.target.reset(),c();return}t.loaderEl.classList.remove("is-hidden");try{const e=await s.getImage(s.fetchedData);if(console.log(e),!e.data||!e.data.hits||e.data.hits.length===0){n.warning({...t.messageOptions,message:"Sorry, there are no images matching your search query. Please try again!"}),c(),t.loadMoreButtonEl.classList.add("is-hidden"),t.loaderEl.classList.add("is-hidden");return}if(t.loaderEl.classList.add("is-hidden"),c(),t.galleryWrapperEl.insertAdjacentHTML("beforeend",u(e.data.hits)),n.success({position:"topRight",message:`Hooray! We found ${e.data.totalHits} images.`}),e.data.hits.length)t.loadMoreButtonEl.classList.remove("is-hidden");else return[];e.data.totalHits<=20&&t.loadMoreButtonEl.classList.add("is-hidden"),g.refresh()}catch(e){console.error(`Error: ${e}`)}}async function L(){try{s.increasePage();const a=t.inputEl.value.trim();s.query=a;const e=await s.getImage(s.fetchedData);if(!e||!e.data||!e.data.hits||e.data.hits.length===0){n.info({...t.messageOptions,message:"Sorry, there are no images!"});return}t.galleryWrapperEl.insertAdjacentHTML("beforeend",u(e.data.hits)),g.refresh(),p=t.galleryWrapperEl.querySelectorAll(".photo-card").length,p>=e.data.totalHits&&(t.loadMoreButtonEl.classList.add("is-hidden"),n.info({...t.messageOptions,message:"Sorry, there are no more images!"}))}catch(a){console.log(a)}}function c(){t.galleryWrapperEl.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map
