import{S as h,i as n,a as m}from"./assets/vendor-b42c18af.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();const o={loadMoreButtonEl:document.querySelector(".load-more"),galleryWrapperEl:document.querySelector(".gallery"),formEl:document.querySelector("form#search-form"),inputEl:document.querySelector('input[type="text"]'),loaderEl:document.querySelector(".loader")};function p(a){return a.map(e=>`
        <div class="photo-card">
            <a class="gallery__item" href="${e.largeImageURL}">
                    <img
                    class="photo"
                    src="${e.webformatURL}"
                    loading="lazy"
                    alt="${e.tags}"
                />
            </a>
            <div class="photo-card__info">
                <p class="photo-card__info--item">
                <b>Likes ${e.likes}</b>
                </p>
                <p class="photo-card__info--item">
                <b>Views ${e.views}</b>
                </p>
                <p class="photo-card__info--item">
                <b>Comments ${e.comments}</b>
                </p>
                <p class="photo-card__info--item">
                <b>Downloads ${e.downloads}</b>
                </p>
            </div>
        </div>
    `).join("")}function l(){o.galleryWrapperEl.innerHTML=""}const u=new h(".gallery a");async function y(a,t){if(a.preventDefault(),t.query=o.inputEl.value.trim(),o.inputEl.blur(),t.query===""){n.info({position:"topRight",message:"Please, type something."}),a.target.reset(),l();return}o.loaderEl.classList.remove("is-hidden");try{const e=await t.getImage(t.fetchedData);if(console.log(e),!e.data||!e.data.hits||e.data.hits.length===0){n.warning({position:"topRight",maxWidth:"430px",message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16px",messageLineHeight:"24px",progressBarColor:"#B51B1B",color:"#EF4040",messageColor:"#ffffff"}),l(),o.loadMoreButtonEl.classList.add("is-hidden"),o.loaderEl.classList.add("is-hidden");return}if(o.loaderEl.classList.add("is-hidden"),t.pageToStartPosition(),l(),o.galleryWrapperEl.insertAdjacentHTML("beforeend",p(e.data.hits)),n.success({position:"topRight",message:`Hooray! We found ${e.data.totalHits} images.`}),e.data.hits.length)o.loadMoreButtonEl.classList.remove("is-hidden");else return[];e.data.totalHits<=20&&o.loadMoreButtonEl.classList.add("is-hidden"),u.refresh()}catch(e){console.error(`Error: ${e}`)}}async function E(a){a.increasePage();try{const t=o.inputEl.value.trim();a.query=t;const e=await a.getImage(a.fetchedData);if(!e||!e.data||!e.data.hits||e.data.hits.length===0){n.info({position:"topRight",maxWidth:"430px",message:"Sorry, there are no more images!",messageSize:"16px",messageLineHeight:"24px",progressBarColor:"#B51B1B",color:"#EF4040",messageColor:"#ffffff"});return}o.galleryWrapperEl.insertAdjacentHTML("beforeend",p(e.data.hits)),u.refresh()}catch(t){console.log(t)}}class g{constructor(){this.page=1,this._searchQuery=""}async getImage(){const t="36626377-ec15308a2cdcc9d1051736749",i=`https://pixabay.com/api/?${new URLSearchParams({key:`${t}`,q:this.query,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:20,page:this.page})}`,r=await m.get(i);return r.status===404?[]:r}increasePage(){this.page+=1,console.log(this.page)}pageToStartPosition(){this.page=1,console.log(this.page)}get fetchedData(){return this._searchQuery}set fetchedData(t){this._searchQuery=t.trim()||""}}const d=new g;function L(a){const t=a.target.value.trim();t===""?(d.pageToStartPosition(),o.loadMoreButtonEl.classList.add("is-hidden"),l()):d.fetchedData=t}const f=new g;o.inputEl.addEventListener("input",L);o.formEl.addEventListener("submit",a=>y(a,f));o.loadMoreButtonEl.addEventListener("click",E(f));
//# sourceMappingURL=commonHelpers.js.map
