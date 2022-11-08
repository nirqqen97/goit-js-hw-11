export function createMarkUp(array) {
   return  array.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads})=>
   `<div class="photo-card">
   <a href="${largeImageURL}" class="gallery-item">
      <img src="${webformatURL}" alt="${tags}" class="img" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes:</b><span>&nbsp${likes}</span>
        </p>
        <p class="info-item">
          <b>Views:</b><span>&nbsp${views}</span>
        </p>
        <p class="info-item">
          <b>Comments:</b><span>&nbsp${comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads:</b><span>&nbsp${downloads}</span>
        </p>
      </div>
      </div>`
      ).join('')
     



    
} 




// {webformatURL, largeImageURL, tags, likes, views, comments, downloads