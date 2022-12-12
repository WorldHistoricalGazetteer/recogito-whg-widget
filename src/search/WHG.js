export const createClient = config => {
  let { baseURL } = config;

  if (!baseURL.endsWith('/'))
    baseURL += '/';

  const searchIndex = (query, offset = 0, fuzzy = false) => {
    let url = `${baseURL}?name=${query}`; // &offset=${offset}`;

    if (offset > 0)
      url += `&offset=${offset}`;

    if (fuzzy)
      url += '&fuzzy=true';

    return fetch(url).then(res => res.json());
  }

  return {
    searchIndex
  }

}