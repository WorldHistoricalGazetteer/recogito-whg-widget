import React from 'react';
import { HiOutlineGlobeAlt } from 'react-icons/hi';

const WhenCollapsed = props => {

  return (
    <div className="r6o-geotagging-toolbar collapsed">
      <button onClick={props.onExpand}>
        <HiOutlineGlobeAlt /> 
        <span>Search WHG</span>
      </button>
    </div>
  )

}

export default WhenCollapsed;