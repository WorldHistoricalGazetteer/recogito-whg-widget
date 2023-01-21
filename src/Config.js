export const createConfig = config => ({
  // baseURL: config.baseURL || 'http://localhost:8000/',
  // baseURL: config.baseURL || 'http://127.0.0.1:8000/',
  baseURL: config.baseURL || 'https://whgazetteer.org/',

  // Tile URL
  tileUrl: config?.tileUrl || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

  // Default map zoom
  defaultZoom: config?.defaultZoom || 7,

  // WHG user auth token
  token: config?.token,

  // default search is https://whgazetteer.org/api/remote?name='
  // additional API params could be added via config or GUI:
    // constraining: name_startswith, fclass, ccodes, area, dataset, collection, pagesize
    // extending: fuzzy
  // -----------------------
  // fclass (geonames feature class letters:
    // A(dmin), P(opulated place), S(ite), R(oad, route, rail), L(andscape), T(errestrial forms), H(ydrological))
  // ccodes (2-letter country codes delimited with ';')
  // area (WHG study area id)
  // dataset id
  // collection id
  // pagesize (default is 10)

  // 2-letter country code array (';' delimiter)
  ccodes: config?.ccodes || [],

  // single year of document publication (e.g. [1832]) or timespan (e.g. [-800,-700])
  when: config?.when || [],

  // area (WHG study area id)
  area: config?.area || ''

});
