export const createConfig = config => ({
  baseURL: config.baseURL || 'https://whgazetteer.org/',

  // Tile URL
  tileUrl: config?.tileUrl || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

  // Default map zoom
  defaultZoom: config?.defaultZoom || 7,

  // WHG user auth token
  token: config?.token,

  // WHG requires ccodes field...
  ccodes: config.ccodes || []
});