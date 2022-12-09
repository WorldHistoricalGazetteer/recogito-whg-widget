import React from 'react';
import L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';  

import './Markers';

import { createConfig } from './Config';

import './index.css';
import './advanced/AdvancedModal.css';
import './placecard/PlaceCard.css';
import './search/SearchInput.css';
import './toolbar/Toolbar.css';

import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';  

import GeoTaggingWidget from './GeoTaggingWidget';

const GeoTaggingPlugin = config => props =>
  <GeoTaggingWidget {...props} config={createConfig(config)} />;

export default GeoTaggingPlugin;