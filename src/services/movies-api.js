const BASE_URL = 'https://api.themoviedb.org/';
const API_KEY = '620fd1643d909a38557fb126f5184475';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrending() {
  return fetchWithErrorHandling(
    `${BASE_URL}3/trending/movie/day?api_key=${API_KEY}`,
  );
}

export function fetchQuery(query) {
  return fetchWithErrorHandling(
    `${BASE_URL}3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
  );
}

export function fetchMovie(id) {
  return fetchWithErrorHandling(
    `${BASE_URL}3/movie/${id}?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchActors(id) {
  return fetchWithErrorHandling(
    `${BASE_URL}3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchReviews(id) {
  return fetchWithErrorHandling(
    `${BASE_URL}3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  );
}
