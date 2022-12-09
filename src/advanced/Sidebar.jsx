import React from 'react';
import ResultList from './resultList/ResultList';

import './Sidebar.css';

const Sidebar = props => {

  return (
    <aside className="whg-sidebar">
      <ResultList results={props.results} />
    </aside>
  )

}

export default Sidebar;