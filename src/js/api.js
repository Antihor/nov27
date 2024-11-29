import axios from 'axios';

export async function getNews(query, currentPage) {
  const API_KEY = '81088765cb514a5b98c190ea1c6dabf9';
  const BASE_URL = 'https://newsapi.org';
  const END_POINT = '/v2/everything';

  const url = `${BASE_URL}${END_POINT}`;

  const params = {
    apiKey: API_KEY,
    q: query,
    language: 'en',
    sortBy: 'popularity',
    pageSize: 10,
    page: currentPage,
  };
  const resp = await axios.get(url, { params });
  return resp.data;
}
