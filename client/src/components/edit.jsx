import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/recordList.css';

const ADDRESS = process.env.REACT_APP_API_ADDRESS;
const PORT = process.env.REACT_APP_API_PORT;

const Edit = props => {
  const [document, setDocument] = useState({ name: '', address: '' });

  useEffect(() => {
    axios.get(`http://${ADDRESS}:${PORT}/record/` + props.match.params.id)
      .then(res => setDocument({
        name: res.data.name,
        address: res.data.address,
      }))
      .catch(err => console.log(err));
  }, [props]);

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://${ADDRESS}:${PORT}/record/update/` + props.match.params.id, document)
      .then(res => console.log(res.data));
    props.history.push('/');
  };

  return (
    <div className='record-card-view'>
      <h3>Update Record</h3>
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
        <button type='submit' >Edit Record</button>
      </form>
    </div>
  );
}

export default Edit;