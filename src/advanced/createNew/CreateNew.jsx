import React from 'react';

import './CreateNew.css';

const CreateNew = props => {

  const onSubmit = evt => {
    evt.preventDefault();
    console.log('submit');
  }

  return (
    <div className="whg-create-new">
      <h2>Use the drawing tools to create a new place.</h2>
      <form onSubmit={onSubmit}>
        <section>
          <input type="text" name="title" placeholder="Title (required)" />
          <input type="text" name="date" placeholder="Date" />
        </section>

        <section className="featuretypes">
          <button className="add-featuretype">+ add feature type</button>
        </section>

        <section>
          <textarea name="description" />
        </section>

        <section>
          <input type="submit" value="Save" />
        </section>
      </form>
    </div>
  )

}

export default CreateNew;