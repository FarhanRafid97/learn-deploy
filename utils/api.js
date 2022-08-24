const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

export const fetchApi = (path, option) => {
  return fetch(baseUrl + path, option);
};
