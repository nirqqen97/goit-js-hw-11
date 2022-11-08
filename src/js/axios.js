import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api';
export class NewApiServive{
    #page = 1;
    #query = '';
    #totalPages = 0;
    #params = {
      params: {
        key: '30554154-3b0c94c508b526685c8ecc515',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
      },
    };
    async getPhotos() {
        this.resetPage()
      const { data } = await axios.get(`/?q=${this.#query}&page=${this.#page}`, this.#params);
      return data;
    }
    async onLoadMore() {
        this.incrementPage()
        const { data } = await axios.get(`/?q=${this.#query}&page=${this.#page}`, this.#params);
        return data;
      }
    set query(newQuery) {
        this.#query = newQuery;
      }
      incrementPage() {
        this.#page += 1;
      }
      resetPage(){
         this.#page = 1;  
      }
}
