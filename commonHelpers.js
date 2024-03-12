import{a as m,S as y,i as c}from"./assets/vendor-da186403.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const p of a.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&n(p)}).observe(document,{childList:!0,subtree:!0});function s(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(t){if(t.ep)return;t.ep=!0;const a=s(t);fetch(t.href,a)}})();const r={loadMoreButtonEl:document.querySelector(".load-more"),galleryWrapperEl:document.querySelector(".gallery"),formEl:document.querySelector("form#search-form"),inputEl:document.querySelector('input[type="text"]'),loaderEl:document.querySelector(".loader")};function f(o){return o.map(s=>`
        <div class="photo-card">
            <a class="gallery__item" href="${s.largeImageURL}">
                    <img
                    class="photo"
                    src="${s.webformatURL}"
                    loading="lazy"
                    alt="${s.tags}"
                />
            </a>
            <div class="photo-card__info">
                <p class="photo-card__info--item">
                <b>Likes ${s.likes}</b>
                </p>
                <p class="photo-card__info--item">
                <b>Views ${s.views}</b>
                </p>
                <p class="photo-card__info--item">
                <b>Comments ${s.comments}</b>
                </p>
                <p class="photo-card__info--item">
                <b>Downloads ${s.downloads}</b>
                </p>
            </div>
        </div>
    `).join("")}class u{constructor(){this.page=1,this._searchQuery=""}async getImage(){const e="36626377-ec15308a2cdcc9d1051736749",n=`https://pixabay.com/api/?${new URLSearchParams({key:`${e}`,q:this.query,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:20,page:this.page})}`,t=await m.get(n);return t.status===404?[]:t}increasePage(){this.page+=1,console.log(this.page)}pageToStartPosition(){this.page=1,console.log(this.page)}get fetchedData(){return this._searchQuery}set fetchedData(e){this._searchQuery=e.trim()||""}}function d(){r.galleryWrapperEl.innerHTML=""}const h=new y(".gallery a"),i=new u;async function E(o){if(o.preventDefault(),i.query=r.inputEl.value.trim(),r.inputEl.blur(),i.query===""){c.info({position:"topRight",message:"Please, type something."}),o.target.reset(),d();return}r.loaderEl.classList.remove("is-hidden");try{const e=await i.getImage(i.fetchedData);if(console.log(e),!e.data||!e.data.hits||e.data.hits.length===0){c.warning({position:"topRight",maxWidth:"430px",message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16px",messageLineHeight:"24px",progressBarColor:"#B51B1B",color:"#EF4040",messageColor:"#ffffff"}),d(),r.loadMoreButtonEl.classList.add("is-hidden"),r.loaderEl.classList.add("is-hidden");return}if(r.loaderEl.classList.add("is-hidden"),i.pageToStartPosition(),d(),r.galleryWrapperEl.insertAdjacentHTML("beforeend",f(e.data.hits)),c.success({position:"topRight",message:`Hooray! We found ${e.data.totalHits} images.`}),e.data.hits.length)r.loadMoreButtonEl.classList.remove("is-hidden");else return[];e.data.totalHits<=20&&r.loadMoreButtonEl.classList.add("is-hidden"),h.refresh()}catch(e){console.error(`Error: ${e}`)}}const l=new u;async function L(){l.increasePage();try{const o=r.inputEl.value.trim();l.query=o;const e=await l.getImage(l.fetchedData);if(!e||!e.data||!e.data.hits||e.data.hits.length===0){c.info({position:"topRight",maxWidth:"430px",message:"Sorry, there are no more images!",messageSize:"16px",messageLineHeight:"24px",progressBarColor:"#B51B1B",color:"#EF4040",messageColor:"#ffffff"});return}r.galleryWrapperEl.insertAdjacentHTML("beforeend",f(e.data.hits)),h.refresh()}catch(o){console.log(o)}}const g=new u;function b(o){const e=o.target.value.trim();e===""?(g.pageToStartPosition(),r.loadMoreButtonEl.classList.add("is-hidden"),d()):g.fetchedData=e}r.inputEl.addEventListener("input",b);r.formEl.addEventListener("submit",E);r.loadMoreButtonEl.addEventListener("click",L);
//# sourceMappingURL=commonHelpers.js.map
