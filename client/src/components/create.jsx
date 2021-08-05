import React, { useState } from 'react';
import axios from 'axios';
import '../styles/recordList.css';

const ADDRESS = process.env.REACT_APP_API_ADDRESS;
const PORT = process.env.REACT_APP_API_PORT;

const Create = () => {
  const [document, setDocument] = useState({ name: '', address: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://${ADDRESS}:${PORT}/record/add`, document)
      .then(res => console.log(res.data));
    setDocument({ name: '', address: '' });
  };

  return (
    <div className='record-card-view'>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input
            type='text'
            value={document.name}
            onChange={e => setDocument({
              name: e.target.value,
              address: document.address,
            })}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type='text'
            value={document.address}
            onChange={e => setDocument({
              name: document.name,
              address: e.target.value,
            })}
          />
        </div>
        <button type='submit' >Create Record</button>
      </form>
    </div>
  );
}

export default Create;