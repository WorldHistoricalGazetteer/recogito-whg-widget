import React, { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { CgSpinnerAlt } from 'react-icons/cg';
import { createClient } from './WHG';

const SearchInput = props => {

  const whg = createClient(props.config);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState();

  useEffect(() => {
    if (props.value && props.initialSearch) {
      setSearch(props.value);
      query(props.value);
    }
  }, [props.value]);

  const query = q => {
    setLoading(true);

    whg.searchIndex(q)
      .then(results => {
        setLoading(false);
        props.onSearch({ search, results });
      });
  }

  const onChange = evt => {
    const { value } = evt.target;
    setSearch(value);
    props.onChange(value);
  }

  const onKeyDown = evt => {
    if (evt.key === 'Enter')
      query(search);
  }

  return (
    <div className="r6o-geotagging-search">
      <button onClick={query}>
        <HiSearch />
      </button>

      <input
        placeholder="Search for a place..."
        value={search}
        onChange={onChange}
        onKeyDown={onKeyDown}/>

      {loading &&
        <CgSpinnerAlt className="rotating" />
      }
    </div>
  );

}

export default SearchInput;
