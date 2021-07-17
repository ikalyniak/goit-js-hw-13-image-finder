const API_KEY = '22540552-ad6fedb3f5750c17229d327bb';
const BASE_URL = 'https://pixabay.com/api/';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    // console.log(this);
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    return fetch(url) // return чтобы вернуть промис во внешний код
      .then(response => {
        // console.log(response);
        if (!response.ok) {
          throw Error(`Something went wrong`);
        }

        return response.json();
      })
      .then(({ hits }) => {
        // деструктуризируем data (чтобы не возвращать data.articles)
        // console.log(data);
        this.incrementPage();
        return { hits }; // return чтобы вернуть данные (результат колбека) во внешний код
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
