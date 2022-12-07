export const createConfig = config => ({
  baseURL: config.baseURL || 'https://whgazetteer.org/api/remote/',

  // Widget height
  height: config?.height || 200,

  // Tile URL
  tileUrl: config?.tileUrl || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

  // Default map marker origin
  defaultOrigin: config?.defaultOrigin || [0, 0],

  // Default map zoom
  defaultZoom: config?.defaultZoom || 7,

  search: config?.search
});