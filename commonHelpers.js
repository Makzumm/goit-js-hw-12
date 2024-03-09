import{a as m,S as f,i as n}from"./assets/vendor-da186403.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const p of a.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function d(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();const y={loadMoreButtonEl:document.querySelector(".load-more"),galleryWrapper:document.querySelector(".gallery"),formEl:document.querySelector("form#search-form"),inputEl:document.querySelector('input[type="text"]'),loaderEl:document.querySelector(".loader")};class L{constructor(){this.page=1,this._searchQuery=""}async getImage(e){const r="36626377-ec15308a2cdcc9d1051736749",t=`https://pixabay.com/api/?${new URLSearchParams({key:`${r}`,q:`${e}`,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:20,page:this.page})}`,a=await m.get(t);return a.status===404?[]:a}increasePage(){this.page+=1}pageToStartPosition(){this.page=1}get fetchedData(){return this._searchQuery}set fetchedData(e){this._searchQuery=e}}function h(s){return s.map(r=>`
        <div class="photo-card">
            <a class="gallery__item" href="${r.largeImageURL}">
                    <img
                    class="photo"
                    src="${r.webformatURL}"
                    loading="lazy"
                    alt="${r.tags}"
                />
            </a>
            <div class="photo-card__info">
                <p class="photo-card__info--item">
                <b>Likes ${r.likes}</b>
                </p>
                <p class="photo-card__info--item">
                <b>Views ${r.views}</b>
                </p>
                <p class="photo-card__info--item">
                <b>Comments ${r.comments}</b>
                </p>
                <p class="photo-card__info--item">
                <b>Downloads ${r.downloads}</b>
                </p>
            </div>
        </div>
    `).join("")}const{loadMoreButtonEl:i,galleryWrapper:u,formEl:b,inputEl:l,loaderEl:g}=y,o=new L,E=new f(".gallery a");l.addEventListener("input",s=>{o.fetchedData=s.target.value});b.addEventListener("submit",S);async function S(s){if(s.preventDefault(),o.query=s.currentTarget.elements.searchQuery.value.trim(),l.blur(),o.query===""){n.info({position:"topRight",message:"Please, type something."}),s.target.reset(),c();return}g.classList.remove("is-hidden"),o.pageToStartPosition();try{const e=await o.getImage(o.fetchedData);if(console.log(e),!e.data||!e.data.hits||e.data.hits.length===0){n.warning({position:"topRight",maxWidth:"430px",message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16px",messageLineHeight:"24px",progressBarColor:"#B51B1B",color:"#EF4040",messageColor:"#ffffff"}),c(),i.classList.add("is-hidden"),g.classList.add("is-hidden");return}if(g.classList.add("is-hidden"),c(),u.insertAdjacentHTML("beforeend",h(e.data.hits)),n.success({position:"topRight",message:`Hooray! We found ${e.data.totalHits} images.`}),e.data.hits.length)i.classList.remove("is-hidden");else return[];e.data.totalHits<=20&&i.classList.add("is-hidden"),E.refresh()}catch(e){console.error(`Error: ${e}`)}}l.addEventListener("input",()=>{l.value.trim()===""&&(o.pageToStartPosition(),i.classList.add("is-hidden"),c())});i.addEventListener("click",_);async function _(s){o.increasePage();try{const e=await o.getImage(o.fetchedData);o.page===Math.ceil(e.data.total/20)&&(i.classList.add("is-hidden"),n.info({position:"topRight",maxWidth:"430px",message:"Sorry, there are no more images!",messageSize:"16px",messageLineHeight:"24px",progressBarColor:"#B51B1B",color:"#EF4040",messageColor:"#ffffff"})),u.insertAdjacentHTML("beforeend",h(e.data.hits)),new f(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}catch(e){console.log(e)}}function c(){u.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map
