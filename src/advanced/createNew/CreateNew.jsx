import React, { useState } from 'react';
import VocabularyModal from './vocabulary/VocabularyModal';
import TypeList from './TypeList';

import './CreateNew.css';

const CreateNew = props => {

  const [title, setTitle] = useState('');

  const [date, setDate] = useState('');

  const [modalOpen, setModalOpen] = useState(false);

  const [types, setTypes] = useState([]);

  const [description, setDescription] = useState('');

  const onSubmit = () => {
    console.log('form submit');
  }

  const onAddFeatureType = val => {
    const tag = val.label ? val : { label: val };
    setTypes([...types, tag]);
    setModalOpen(false);
  }

  const onRemoveFeatureType = typ =>
    setTypes(types.filter(t => t !== typ));

  return (
    <div className="whg-create-new">
      <h2>Use the drawing tools to create a new place.</h2>
      <section>
        <input 
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

      <section>
        <button onClick={onSubmit}>Save</button>
      </section>

      {modalOpen && (
        <VocabularyModal 
          onAddFeatureType={onAddFeatureType} /> 
      )}
    </div>
  )

}

export default CreateNew;