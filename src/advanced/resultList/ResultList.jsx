import React from 'react';

import './ResultList.css';

const Result = props => {

  const { result, onClick } = props;

  console.log(result);

  const { properties } = result;

  const permalink = `https://whgazetteer.org/places/${properties.index_id}/portal`;

  return (
    <li onClick={onClick}>
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
      {/* descriptions.length > 0 && 
        <p>{descriptions[0]}</p> 
      */}
    </li>
  )

}

const SearchResults = props => {

  return (
    <div className="whg-search-results-list">
      <ul>
        {props.results.map(result =>
          <Result result={result} />
        )}
      </ul>
    </div>
  )

}

export default SearchResults;