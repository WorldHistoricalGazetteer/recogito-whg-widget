import React from 'react';
import ResultList from './resultList/ResultList';

import './Sidebar.css';

const Sidebar = props => {

  return (
    <aside className="whg-sidebar">
      <ResultList 
        results={props.results} 
        selected={props.selected}
        onSelect={props.onSelectResult} />
    </aside>
  )

}

export default Sidebar;