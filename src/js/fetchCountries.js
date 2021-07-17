const BASE_URL = 'https://restcountries.eu/rest/v2';

export default function fetchCountries(searchQuery) {
  return fetch(`${BASE_URL}/name/${searchQuery}`).then(response => {
    // console.log(response);
    if (!response.ok) {
      throw Error(`The country does not exist!`);
    }
    return response.json();
  });
}
