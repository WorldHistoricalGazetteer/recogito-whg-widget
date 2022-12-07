import React, { useEffect, useState } from 'react';
import centroid from '@turf/centroid';
import AdvancedModal from './advanced/AdvancedModal';
import PlaceCard from './placecard/PlaceCard';
import Toolbar from './toolbar/Toolbar';

const toBody = feature => ({
  ...feature,
  purpose: 'geotagging'
});

const getBody = annotation =>
  annotation.bodies.find(b => b.purpose === 'geotagging');

const GeoTaggingWidget = props => {

  const [body, setBody] = useState(getBody(props.annotation));

  const [isExpanded, setIsExpanded] = useState(Boolean(body));

  const [search, setSearch] = useState();

  const [searchResults, setSearchResults] = useState();

  const [advancedEditing, setAdvancedEditing] = useState(false);

  useEffect(() => {
    if (isExpanded && !search)
      setSearch(props.annotation.quote);
  }, [isExpanded])
  
  const onChangeFeature = feature => {
    const updated = toBody(feature);
    setBody(updated);
    props.onUpsertBody(updated);
  }

  const onDelete = () => {
    const body = getBody(props.annotation);
    props.onRemoveBody(body);
    setBody(null);
  }

  const onAdvacedEditingDone = feature => {
    const updated = toBody(feature);
    setBody(updated);
    props.onUpsertBody(updated);
    setAdvancedEditing(false);
  }

  const onAdvacedEditingCanceled = () =>
    setAdvancedEditing(false);

  const onSearch = ({ results }) => {
    setSearchResults(results);
    
    if (results.length > 0) {
      const updated = toBody(results[0]);
      setBody(updated);
      props.onUpsertBody(updated);
    } else {
      // TODO
      console.log('No result found');
    }
  }

  const onCollapseToCentroid = () => {
    const collapsed = toBody({
      ...body,
      geometry: centroid(body)
    });
    setBody(collapsed);
    props.onUpsertBody(collapsed);
  }

  return (
    <div className="r6o-geotagging r6o-widget">
      <Toolbar 
        isExpanded={isExpanded}
        config={props.config}
        search={search}
        feature={body}
        onExpand={() => setIsExpanded(true)}
        onDeleteGeoTag={onDelete} 
        onSearch={onSearch} 
        onChangeSearch={setSearch}
        onCollapseToCentroid={onCollapseToCentroid} />

      {body && <PlaceCard 
        config={props.config}
        search={search}
        feature={body}
        onChangeFeature={onChangeFeature} 
        onGoAdvanced={() => setAdvancedEditing(true)}/>
      }

      {advancedEditing &&
        <AdvancedModal 
          config={props.config}
          search={search}
          initialResults={searchResults}
          feature={body}
          onChangeSearch={setSearch}
          onOk={onAdvacedEditingDone}
          onCancel={onAdvacedEditingCanceled} />
      }
    </div>
  )

}

export default GeoTaggingWidget;
