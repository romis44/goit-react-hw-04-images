const URL = 'https://pixabay.com/api/';
const KEY = '32963185-de2a3cc77f96c5f9b997ac31c';

export default function fetchApi(query, page = 1) {
  return fetch(
    `${URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    return response.json();
  });
}
