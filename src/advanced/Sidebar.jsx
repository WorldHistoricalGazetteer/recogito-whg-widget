import React, { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { GoPencil } from 'react-icons/go';
import ResultList from './resultList/ResultList';

import './Sidebar.css';

const Sidebar = props => {

  const [open, setOpen] = useState(1);

  const onTogglePanel = idx => {
    setOpen(idx);

    if (idx === 1)
      props.onTogglePanel('search');
    else 
      props.onTogglePanel('create');
  }

  return (
    <aside className="whg-sidebar">
      <section 
        className={open === 1 ? 'result-list' : 'result-list closed'}>
        <header 
          className="accordion-header"
          onClick={() => onTogglePanel(1)}>
          <FaList /> <span>{props.results.length} Results</span>
        </header>
        <main className="accordion-content">
          <ResultList 
            results={props.results} 
            selected={props.selected}
            onSelect={props.onSelectResult} 
            onLoadMore={props.onLoadMore} />
        </main>
      </section>

      <section 
        className={open === 2 ? 'create-new' : 'create-new closed'}>
        <header 
          className="accordion-header"
          onClick={() => onTogglePanel(2)}>
          <GoPencil /> Create New Place
        </header>

        <main className="accordion-content">

        </main>
      </section>
    </aside>
  )

}

export default Sidebar;