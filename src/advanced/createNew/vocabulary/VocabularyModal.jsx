import React from 'react';
import Papa from 'papaparse';
import Autocomplete from './Autocomplete';

import './VocabularyModal.css';

let FEATURETYPES = [];

Papa.parse('feature-types-AAT_20210118.tsv', {
	download: true,
  header: true,
  complete: ({ data }) => FEATURETYPES = data
    .map(row => ({ label: row.term, aat_id: row.aat_id }))
		// display singular form 'term' instead of plural class name
    // .map(row => ({ label: row.term_full, aat_id: row.aat_id }))
    .filter(item => item.label) // Filter empty rows
});

const VocabularyModal = props => {

  return (
    <div className="whg-vocabulary-modal-wrapper">
      <div className="whg-vocabulary-modal">
        <Autocomplete
          focus
          vocabulary={FEATURETYPES}
          placeholder="Search AAT feature types or type your own"
          onSubmit={props.onAddFeatureType} />
      </div>
    </div>
  )

}

export default VocabularyModal;
