import React, { useEffect } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

const CENTER_POINT = L.point(82, 70);

const MinimapContents = props => {

  const map = useMap();

  useEffect(() => {
    map.panTo(map.containerPointToLatLng(CENTER_POINT), { animate: false});
  }, [ props.center[0], props.center[1] ]);

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {props.center && <Marker position={props.center} /> }
    </>
  )

}

const Minimap = props => {

  const zoom = props.center ? 4 : 1;

  return (
    <MapContainer   
      key={JSON.stringify(props.center)}
      className="minimap" 
      zoomControl={false}
      center={props.center} 
      zoom={zoom}
      attributionControl={false}>
      <MinimapContents {...props} />
    </MapContainer>
  );

}

export default Minimap;