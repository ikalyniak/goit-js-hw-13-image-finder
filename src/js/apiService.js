const API_KEY = '22540552-ad6fedb3f5750c17229d327bb';
const BASE_URL = 'https://pixabay.com/api/';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const { hits } = await response.json();
      // console.log({ hits });

      //посмотреть что возвращает response.json() и деструктуризировать
      // const a = await response.json();
      // console.log(a);

      this.incrementPage();
      return { hits };
    } catch {
      throw Error(`Something went wrong`);
    }

    // return fetch(url)
    //   .then(response => {
    //     // console.log(response);
    //     if (!response.ok) {
    //       throw Error(`Something went wrong`);
    //     }

    //     return response.json();
    //   })
    //   .then(({ hits }) => {
    //     this.incrementPage();
    //     return { hits };
    //   });
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
