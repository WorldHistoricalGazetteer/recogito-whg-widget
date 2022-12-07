import React from 'react';
import centroid from '@turf/centroid';
import { MdModeEdit } from 'react-icons/md';
import { ImWarning } from 'react-icons/im';
import Minimap from './Minimap';

const PlaceCard = props => {

  const { feature } = props;

  const center = centroid(feature)?.geometry.coordinates.slice().reverse();

  const { properties } = feature;

  const permalink = properties && `https://whgazetteer.org/places/${properties.index_id}/portal`;

  const onConfirm = () => {
    props.onChangeFeature({
      ...feature,
      properties: {
        ...feature.properties,
        is_confirmed: true
      }
    });
  }

  return (
    <div className="r6o-g8r-card">
      <Minimap center={center} />

      <div className="r6o-g8r-card-content-wrapper">
        <div className="r6o-g8r-card-metadata">
          <div>
            <h3>{properties.title}</h3>
            <p className="uri">
              <a href={permalink} target="_blank">whg:{properties.index_id}</a>
            </p>
          </div>

          {properties.is_confirmed &&
            <button 
              className="edit-match"
              onClick={props.onGoAdvanced}>
              <MdModeEdit /> <span>Change</span>
            </button>
          }
          
          {!properties.is_confirmed &&
            <div className="suggestion-warning">
              <span className="warning">
                <ImWarning /> <span>Suggestion</span>
              </span>
              
              <div className="buttons">
                <button 
                  onClick={props.onGoAdvanced}>
                  Change
                </button>
                
                <button
                  onClick={onConfirm}>
                  Confirm
                </button>    
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )

}

export default PlaceCard;