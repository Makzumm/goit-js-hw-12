import{a as m,S as f,i as u}from"./assets/vendor-da186403.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const y={loadMoreButtonEl:document.querySelector(".load-more"),galleryWrapper:document.querySelector(".gallery"),formEl:document.querySelector("form#search-form"),inputEl:document.querySelector('input[type="text"]'),loaderEl:document.querySelector(".loader")};class L{constructor(){this.page=1,this._searchQuery=""}async getImage(e){const s="36626377-ec15308a2cdcc9d1051736749",t=`https://pixabay.com/api/?${new URLSearchParams({key:`${s}`,q:`${e}`,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:20,page:this.page})}`,r=await m.get(t);return r.status===404?[]:r}increasePage(){this.page+=1}pageToStartPosition(){this.page=1}get fetchedData(){return this._searchQuery}set fetchedData(e){this._searchQuery=e}}function g(a){return a.map(s=>`
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
    `).join("")}const{loadMoreButtonEl:i,galleryWrapper:h,formEl:b,inputEl:c,loaderEl:p}=y,o=new L,v=new f(".gallery a");c.addEventListener("input",a=>{o.fetchedData=a.target.value});b.addEventListener("submit",E);async function E(a){if(a.preventDefault(),o.query=a.currentTarget.elements.searchQuery.value.trim(),c.blur(),o.query===""){u.info({position:"topRight",message:"Please, type something."}),a.target.reset(),n();return}p.classList.remove("is-hidden");try{const e=await o.getImage(o.fetchedData);if(console.log(e),!e.data||!e.data.hits||e.data.hits.length===0){u.warning({position:"topRight",maxWidth:"430px",message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16px",messageLineHeight:"24px",progressBarColor:"#B51B1B",color:"#EF4040",messageColor:"#ffffff"}),n(),p.classList.add("is-hidden");return}if(p.classList.add("is-hidden"),n(),h.insertAdjacentHTML("beforeend",g(e.data.hits)),u.success({position:"topRight",message:`Hooray! We found ${e.data.totalHits} images.`}),e.data.hits.length)i.classList.remove("is-hidden");else return[];e.data.totalHits<=20&&i.classList.add("is-hidden"),v.refresh()}catch(e){console.error(`Error: ${e}`)}}c.addEventListener("input",()=>{c.value.trim()===""&&(i.classList.add("is-hidden"),n())});i.addEventListener("click",_);async function _(a){o.increasePage();try{const e=await o.getImage(o.fetchedData);o.page===Math.ceil(e.data.total/20)&&(i.classList.add("is-hidden"),Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")),h.insertAdjacentHTML("beforeend",g(e.data.hits)),new f(".gallery a",{captionsData:"alt",captionDelay:250}),f.refresh()}catch(e){console.log(e)}}function n(){h.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map