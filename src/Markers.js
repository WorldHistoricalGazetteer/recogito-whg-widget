import MarkerIcon from '../public/leaflet/marker-icon.png';
import MarkerShadow from '../public/leaflet/marker-shadow.png';
import MarkerIcon2x from '../public/leaflet/marker-icon-2x.png';
import MarkerShadow2x from '../public/leaflet/marker-shadow-2x.png';

import GreyMarkerIcon from '../public/leaflet/marker-icon-grey.png';
import GreyMarkerIcon2x from '../public/leaflet/marker-icon-grey-2x.png';

L.Icon.Default.mergeOptions({
  iconUrl: MarkerIcon,
  shadowUrl: MarkerShadow,
  iconRetinaUrl: MarkerIcon2x,
  shadowRetinaUrl: MarkerShadow2x
});

export const GreyMarker = L.icon({
  iconUrl: GreyMarkerIcon,
  shadowUrl: MarkerShadow,
  iconRetinaUrl: GreyMarkerIcon2x,
  shadowRetinaUrl: MarkerShadow2x,
  iconSize:     [25, 41],
  shadowSize:   [41, 41],
  iconAnchor:   [12, 41],
  shadowAnchor: [12, 41]
});



