import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import './TypeList.css';

const TypeList = props => {

  const [ showDelete, setShowDelete ] = useState(false);

  const toggle = tag => _ => {
    if (showDelete === tag) // Removes delete button
      setShowDelete(false);
    else
      setShowDelete(tag); // Sets delete button on a different tag
  }

  return (
    <div className="whg-taglist">
      {props.types.length > 0 &&
        <ul>
          {props.types.map(tag =>
            <li key={tag.label} onClick={toggle(tag)}>
              <span className="r6o-label">{tag.label}</span>

              <CSSTransition in={showDelete === tag} timeout={200} classNames="r6o-delete">
                <span className="r6o-delete-wrapper" onClick={() => props.onDelete(tag)}>
                  <span className="r6o-delete">
                    X
                  </span>
                </span>
              </CSSTransition>
            </li>
          )}
        </ul>
      }
    </div>
  )

}

export default TypeList;