import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { IoCheckmarkOutline, IoCloseOutline } from 'react-icons/io5';
import { MapContainer, TileLayer } from 'react-leaflet';
import centroid from '@turf/centroid';
import bbox from '@turf/bbox';
import SearchInput from '../search/SearchInput';
import Sidebar from './Sidebar';

// Shorthand
const getCentroid = feature =>
  centroid(feature)?.geometry.coordinates.slice().reverse();

const AdvancedModal = props => {

  const [map, setMap] = useState(null);

  const [okEnabled, setOkEnabled] = useState(true);

  const [editingEnabled, setEditingEnabled] = useState(false);

  const [searchResults, setSearchResults] = useState(props.initialResults);

  const fitMap = features => {
    const bounds = bbox({
      type: 'FeatureCollection',
      features
    });

    console.log({
      type: 'FeatureCollection',
      features
    }, bounds);

    const isPoint = bounds.geometry?.type === 'Point';

    const maxZoom = props.config.defaultZoom;

    if (isPoint) {
      map.setView(getCentroid(feature), maxZoom);
    } else {
      map.fitBounds([
        [bounds[1], bounds[0]],
        [bounds[3], bounds[2]]
      ], {
        animate:false,
        padding: [30, 30]
      });  
    }
  }
  
  useEffect(() => {
    if (map) {
      searchResults.forEach(result => {
        L.geoJSON(result).addTo(map);
      });

      // Dis- or enable the OK button depending on whether there's a feature
      map.on('pm:create', () => {
        setOkEnabled(true);
      });

      map.on('pm:remove', () => {
        const remainingFeatures = map.pm.getGeomanLayers();
        if (remainingFeatures.length === 0)
          setOkEnabled(false);
      });

      fitMap(searchResults);
    }
  }, [ map, editingEnabled ]);

  useEffect(() => {
    if (editingEnabled) {
      map?.pm?.addControls({ 
        position: 'topleft',
        drawCircle: false,
        drawCircleMarker: false 
      });
    } else {
      map?.pm?.removeControls();  
    }
  }, [ editingEnabled ]);

  const onOk = () => {
    const geojson = map.pm
      .getGeomanLayers()
      .map(l =>  l.toGeoJSON());

    if (geojson.length === 1) {
      props.onOk({
        type: 'Feature',
        properties: {
          ...geojson[0].properties,
          is_confirmed: true
        },
        geometry: geojson[0].geometry,
      });
    } else if (geojson.length > 1) {
      props.onOk({
        type: 'Feature',
        geometry: {
          type: 'GeometryCollection',
          properties: {
            ...geojson[0].properties,
            is_confirmed: true
          },
          geometries: geojson.map(g => g.geometry)
        }
      });
    }
  }

  const clearMap = () => {
    map.eachLayer(layer => {
      if (layer.feature)
        map.removeLayer(layer);
    });
  }

  const onSearch = ({ results }) => {
    clearMap();

    setSearchResults(results);

    if (results.length > 0) {
      const layer = L.geoJSON(results[0]).addTo(map);

      // Remove URI if user changes anything
      layer.on('pm:edit', evt =>
        delete evt.layer.feature.properties.uri);

      fitMap(results);
    }
  }

  return ReactDOM.createPortal(
    <div className="r6o-geotagging-advanced-container">
      <div className="r6o-geotagging-advanced-modal" role="dialog">
        <header>
          <SearchInput 
            config={props.config}
            value={props.search}
            onChange={props.onChangeSearch}
            onSearch={onSearch} />

          <div className="r6o-geotagging-advanced-modal-header-buttons">
            <button
              className="r6o-geotagging-advanced-modal-cancel"
              onClick={props.onCancel}>
              <IoCloseOutline /> 
              <span>Cancel</span>
            </button>

            <button 
              className="r6o-geotagging-advanced-modal-ok"
              disabled={!okEnabled}
              onClick={onOk}>
              <IoCheckmarkOutline />
              <span>Ok</span>
            </button>
          </div>
        </header>

        <main>
          <MapContainer
            className="whg-map"
            zoom={props.config.defaultZoom}
            preferCanvas={true}
            whenCreated={setMap}>

            <TileLayer
              url={props.config.tileUrl} />
          </MapContainer>  
          
          <Sidebar results={searchResults} />
        </main>
      </div>
    </div>, document.body);

}

export default AdvancedModal;