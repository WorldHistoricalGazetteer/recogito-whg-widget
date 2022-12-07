export const createClient = config => {
  let { baseURL } = config;

  if (!baseURL.endsWith('/'))
    baseURL += '/';

  const searchIndex = query => 
    fetch(`${baseURL}?name=${query}`)
      .then(res => res.json())
      .then(data => data.features || []);

  return {
    searchIndex
  }

}