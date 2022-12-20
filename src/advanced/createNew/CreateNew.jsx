import React, { useEffect, useState } from 'react';
import VocabularyModal from './vocabulary/VocabularyModal';
import TypeList from './TypeList';

import './CreateNew.css';

const CreateNew = props => {

  const { token } = props.config;

  const [title, setTitle] = useState('');

  const [date, setDate] = useState('');

  const [modalOpen, setModalOpen] = useState(false);

  const [types, setTypes] = useState([]);

  const [description, setDescription] = useState('');

  const [required, setRequired] = useState(props.showRequired);

  const [datasets, setDatasets] = useState([ 'remote02' ]);

  const [selectedDataset, setSelectedDataset] = useState('remote02');

  useEffect(() => {
    if (token) {
      fetch(`${props.config.baseURL}ds/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`
        }
      }).then(res => res.json())
        .then(data => {
          // TODO
          console.log(data);
        });
    }
  }, []);

  useEffect(() => {
    const metadata = {
      title, date, types, description
    };

    if (title) {
      props.onChange(metadata);
      setRequired(false);
    } else if (date || description || types.length > 0) {
      setRequired(true);
    }
  }, [title, date, types, description]);

  useEffect(() => {
    setRequired(props.showRequired);
  }, [props.showRequired])

  const onAddFeatureType = val => {
    const tag = val.label ? val : { label: val };
    setTypes([...types, tag]);
    setModalOpen(false);
  }

  const onRemoveFeatureType = typ =>
    setTypes(types.filter(t => t !== typ));

  const onSaveToDataset = () => {
    const place = {
      title,
      dataset: selectedDataset,
      types: types.map(({ aat_id, label}) => ({
        label, identifier: `aat:${aat_id}`
      })),
      descriptions: [{
        value: description
      }]
    };

    console.log('POSTing', place);

    /*
    fetch(`${props.config.baseURL}pl/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        body: JSON.stringify(place)
      }
    }).then(res => res.json())
      .then(data => {
        console.log(data);
      });
    */
  }

  return (
    <div className="whg-create-new">
      <h2>Use the drawing tools to create a new place.</h2>
      <section>
        <input 
          className={required ? 'missing' : null}
          type="text" 
          name="title" 
          placeholder="Title (required)" 
          value={title} 
          onChange={evt => setTitle(evt.target.value)} />

        <input 
          type="text" 
          name="date" 
          placeholder="Date" 
          value={date}
          onChange={evt => setDate(evt.target.value)} />
      </section>

      <section className="featuretypes">
        <TypeList 
          types={types} 
          onDelete={onRemoveFeatureType} />

        <button 
          className="add-featuretype"
          onClick={() => setModalOpen(true)}>+ add feature type
        </button>
      </section>

      <section>
        <textarea n
          name="description" 
          placeholder="Description"
          value={description}
          onChange={evt => setDescription(evt.target.value)}   />
      </section>

      <section className="save-to-dataset">
        <button 
          disabled={required || !Boolean(token) || datasets.length === 0}
          onClick={onSaveToDataset}>

          Save to Dataset

        </button>
        
        <select
          disabled={!Boolean(token)} 
          value={datasets.length > 0 ? datasets[0] : null}
          onChange={evt => setSelectedDataset(evt.targetValue)}>

          {datasets.map(d => <option key={d} value={d}>{d}</option>)}

        </select>
      </section>

      {modalOpen && (
        <VocabularyModal 
          onAddFeatureType={onAddFeatureType} /> 
      )}
    </div>
  )

}

export default CreateNew;