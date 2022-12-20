import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { IoCheckmarkOutline, IoCloseOutline } from 'react-icons/io5';
import { MapContainer, TileLayer } from 'react-leaflet';
import centroid from '@turf/centroid';
import bbox from '@turf/bbox';
import SearchInput from '../search/SearchInput';
import Sidebar from './Sidebar';
import { GreyMarker } from '../Markers';
import { createClient } from '../search/WHG';

// Shorthand
const getCentroid = feature =>
  centroid(feature)?.geometry.coordinates.slice().reverse();

const AdvancedModal = props => {

  const whg = createClient(props.config);

  const [map, setMap] = useState(null);

  const [okEnabled, setOkEnabled] = useState(true);

  const [editingEnabled, setEditingEnabled] = useState(false);

  const [searchResults, setSearchResults] = useState(props.initialResults);

  const [selectedResult, setSelectedResult] = useState(props.feature);

  const [newPlace, setNewPlace] = useState(null);

  const clearMap = () => {
    map.eachLayer(layer => {
      if (layer.feature)
        map.removeLayer(layer);
    });
  }

  const fitMap = features => {
    const bounds = bbox({
      type: 'FeatureCollection',
      features
    });

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
      // Dis- or enable the OK button depending on whether there's a feature
      map.on('pm:create', () => {
        setOkEnabled(true);
      });

      map.on('pm:remove', () => {
        const remainingFeatures = map.pm.getGeomanLayers();
        if (remainingFeatures.length === 0)
          setOkEnabled(false);
      });

      fitMap(searchResults.features);
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

  useEffect(() => {
    if (map) {
      clearMap();
      drawSearchResults();
    }
  }, [ map, searchResults, selectedResult ]);

  const drawSearchResults = () => {
    searchResults.features.forEach(result => {
      L.geoJSON(result, {
        pointToLayer: function (feature, latlng) {
          const marker = (result.properties.index_id === selectedResult?.properties.index_id) ? 
            L.marker(latlng) :
            L.marker(latlng, { icon: GreyMarker });

          marker.on('click', () => setSelectedResult(result));

          return marker;
        }
      }).addTo(map);
    });
  }

  const onOk = () => {
    if (editingEnabled && newPlace) {
      // Create a new place 
      const geojson = map.pm
        .getGeomanLayers()
        .map(l =>  l.toGeoJSON());

      // Geoman crashes if it is unmounted with an editing tool open...
      const anyEnabled = map.pm.getGeomanLayers().some(l => l.pm._enabled);

      if (!anyEnabled) {
        if (geojson.length === 1) {
          props.onOk({
            type: 'Feature',
            properties: {
              ...geojson[0].properties,
              is_confirmed: true,
              ...newPlace
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
    } else if (!editingEnabled && selectedResult) {
      // Store selected result
      props.onOk({
        ...selectedResult,
        properties: {
          ...selectedResult.properties,
          is_confirmed: true
        }
      });
    } 
  }

  const onSearch = ({ results }) => {
    setSearchResults(results);

    if (results.features.length > 0) {
      setSelectedResult(results.features[0]);
      fitMap(results);
    }
  }

  const onSelectFromList = result => {
    setSelectedResult(result);
    const center = centroid(result);
    map.panTo(center.geometry.coordinates.slice().reverse());
  }

  const onLoadMore = () => {
    const { count } = searchResults;
    const countLoaded = searchResults.features.length;

    const goFuzzy = searchResults.fuzzy || countLoaded === count;
    const offset = countLoaded === count ? 0 : countLoaded;

    whg.searchIndex(props.search, offset, goFuzzy).then(results => {
      setSearchResults({
        ...searchResults,
        fuzzy: goFuzzy,
        features: [
          ...searchResults.features,
          ...results.features
        ]
      });
    });
  }

  const onTogglePanel = name => {
    clearMap();

    if (name === 'create') {
      setEditingEnabled(true);
    } else {
      setEditingEnabled(false);
      if (searchResults?.features.length > 0) {
        setSelectedResult(searchResults.features[0]);
        drawSearchResults();
        fitMap(searchResults.features);
      }
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
          
          <Sidebar 
            config={props.config}
            results={searchResults} 
            selected={selectedResult}
            showRequired={Boolean(newPlace) || editingEnabled}
            onSelectResult={onSelectFromList} 
            onLoadMore={onLoadMore} 
            onCreateNewPlace={setNewPlace}
            onTogglePanel={onTogglePanel} />
        </main>
      </div>
    </div>, document.body);

}

export default AdvancedModal;