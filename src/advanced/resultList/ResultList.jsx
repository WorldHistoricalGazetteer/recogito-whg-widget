import React from 'react';

import './ResultList.css';

const Result = props => {

  const { result, selected, onClick } = props;

  const { properties } = result;

  const permalink = `https://whgazetteer.org/places/${properties.index_id}/portal`;

  return (
    <li 
      className={selected.properties.index_id === result.properties.index_id ? 'selected' : null}
      onClick={onClick}>
      <h3>
        {properties.title} {properties.ccodes?.length > 0 && (
          <span>({properties.ccodes.join(', ')})</span>
        )}
      </h3>
      <p className="uri">
        <a href={permalink} target="_blank">whg:{properties.index_id}</a>
      </p>
      {properties.variants?.length > 0 && (
        <p className="names">
          {properties.variants.join(', ')}
        </p>
      )}
      <p className="uris"></p>
    </li>
  )

}

const SearchResults = props => {

  return (
    <div className="whg-search-results-list">
      <ul>
        {props.results.features.map(result =>
          <Result 
            result={result} 
            selected={props.selected}
            onClick={() => props.onSelect(result)} />
        )}
      </ul>
      <button 
        className="load-more"
        onClick={props.onLoadMore}>+ Load more</button>
    </div>
  )

}

export default SearchResults;