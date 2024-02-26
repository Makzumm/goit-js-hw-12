import{a as m,S as f,i as l}from"./assets/vendor-da186403.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const g={loadMoreButtonEl:document.querySelector(".load-more"),galleryWrapper:document.querySelector(".gallery"),formEl:document.querySelector("form#search-form"),inputEl:document.querySelector('input[type="text"]'),loaderEl:document.querySelector(".loader")};class h{constructor(){this.page=1,this._searchQuery=""}async getImage(e){const a="36626377-ec15308a2cdcc9d1051736749",t=`https://pixabay.com/api/?${new URLSearchParams({key:`${a}`,q:`${e}`,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:20,page:this.page})}`,r=await m.get(t);return r.status===404?[]:r}increasePage(){this.page+=1}pageToStartPosition(){this.page=1}get fetchedData(){return this._searchQuery}set fetchedData(e){this._searchQuery=e}}function y(o){return o.map(a=>`
        <div class="photo-card">
            <a class="gallery__item" href="${a.largeImageURL}">
                    <img
                    class="photo"
                    src="${a.webformatURL}"
                    loading="lazy"
                    alt="${a.tags}"
                />
            </a>
            <div class="photo-card__info">
                <p class="photo-card__info--item">
                <b>Likes ${a.likes}</b>
                </p>
                <p class="photo-card__info--item">
                <b>Views ${a.views}</b>
                </p>
                <p class="photo-card__info--item">
                <b>Comments ${a.comments}</b>
                </p>
                <p class="photo-card__info--item">
                <b>Downloads ${a.downloads}</b>
                </p>
            </div>
        </div>
    `).join("")}const{galleryWrapper:u,formEl:L,inputEl:i,loaderEl:d}=g,s=new h,b=new f(".gallery a");i.addEventListener("input",o=>{s.fetchedData=o.target.value});L.addEventListener("submit",_);async function _(o){if(o.preventDefault(),s.query=o.currentTarget.elements.searchQuery.value.trim(),i.blur(),s.query===""){l.info({position:"topRight",message:"Please, type something."}),o.target.reset(),p();return}d.classList.remove("is-hidden");try{const e=await s.getImage(s.fetchedData);if(console.log(e),!e.data||!e.data.hits||e.data.hits.length===0){l.warning({position:"topRight",maxWidth:"430px",message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16px",messageLineHeight:"24px",progressBarColor:"#B51B1B",color:"#EF4040",messageColor:"#ffffff"}),p(),d.classList.add("is-hidden");return}d.classList.add("is-hidden"),l.success({position:"topRight",message:`Hooray! We found ${e.totalHits} images.`}),u.insertAdjacentHTML("beforeend",y(e.data.hits)),b.refresh()}catch(e){console.error(`Error: ${e}`)}}i.addEventListener("input",()=>{i.value.trim()===""&&p()});function p(){u.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map
