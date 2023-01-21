export const createClient = config => {
  let { baseURL } = config;

  // console.log('config.area in WHG.js', config.area)

  if (!baseURL.endsWith('/'))
    baseURL += '/';

  baseURL += 'api/remote/';

  const searchIndex = (query, offset = 0, fuzzy = false) => {
    let url = `${baseURL}?name=${query}`; // &offset=${offset}`;

    if (offset > 0)
      url += `&offset=${offset}`;

    if (fuzzy)
      url += '&fuzzy=true';

    if ('area' in config)
      url += '&area='+config.area;
      // url += `&area=${area}`;

    console.log('url', url)

    // return fetch(url, {mode:"no-cors"}).then(res => res.json());
    return fetch(url).then(res => res.json());
  }

  return {
    searchIndex
  }

}
