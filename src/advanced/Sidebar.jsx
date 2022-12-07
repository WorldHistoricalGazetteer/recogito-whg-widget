import React from 'react';

import './Sidebar.css';

const Sidebar = props => {

  const { results } = props;

  console.log(results);

  return (
    <aside className="whg-sidebar">
      <ul>

      </ul>
    </aside>
  )

}

export default Sidebar;