import {NewApiServive} from "./js/axios";
import { refs } from "./js/refs";
import { createMarkUp } from "./js/makeMarkUp";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

// const smth = document.querySelector('.qwe')
// smth.addEventListener('click', clickCH);
// function clickCH(e) {

//     refs.loadMoreRef.classList.remove('is-hidden')
// }
const newApiServive = new NewApiServive();
let infoTotalHIts = 40

refs.formRef.addEventListener('submit', onSubmit);
async function onSubmit(e) {
    e.preventDefault();
    resetHTML();
    infoTotalHIts = 40;
    newApiServive.query = e.currentTarget.elements.searchQuery.value;
    const data = await newApiServive.getPhotos()
    Notify.info(`Hooray! We found ${data.totalHits} images.`)
   if (data.hits.length === 0) {
       Notify.failure("Sorry, there are no images matching your search query. Please try again.")
       return
   }
  
    const check = renderMarkUp(data.hits)
    const simpleLightbox = new SimpleLightbox('.gallery-item');
    simpleLightbox.refresh();
    if (data.hits.length < 40) {
     return 
    }
    refs.loadMoreRef.classList.remove('is-hidden')
}


function renderMarkUp(data) {
    const markUp = createMarkUp(data)
 refs.galleryRef.insertAdjacentHTML('beforeend', markUp)
}
refs.loadMoreRef.addEventListener('click',onLoadMore)


async function onLoadMore() {
    const data = await newApiServive.onLoadMore()
    const check = renderMarkUp(data.hits)
    const simpleLightbox = new SimpleLightbox('.gallery-item');
    simpleLightbox.refresh();
    infoTotalHIts += 40;
   if (data.totalHits <= infoTotalHIts) {
      Notify.failure("We're sorry, but you've reached the end of search results.")
      refs.loadMoreRef.classList.add('is-hidden')
       
   }
}
function resetHTML() {
    refs.galleryRef.innerHTML = '';
}
const lightbox = new SimpleLightbox('.gallery a', {
    captionsData:'alt',
    captionDelay: 250,
    refresh: 'true'

 });














// придумал только такую проверку с количеством страниц,
//  возможно можно сделать как то по-другому?


// const scroll = document.addEventListener('scroll', scrollFunc);

// function scrollFunc(e) {
//     console.log(window.scrollY)
// }