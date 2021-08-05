import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/recordList.css';

const ADDRESS = process.env.REACT_APP_API_ADDRESS;
const PORT = process.env.REACT_APP_API_PORT;

const Record = props =>
  <div className='record-card-view'>
    <p>Name: {props.record.name}</p>
    <p>Address: {props.record.address}</p>
    <div>
      <Link to={'/edit/' + props.record._id}>Edit</Link> | 
      <a href='/' onClick={props.deleteRecord}>Delete</a>
    </div>
  </div>

const RecordList = () => {
  const [records, setRecords] = useState([]);
  
  useEffect(() => {
    axios(`http://${ADDRESS}:${PORT}/record`)
      .then(response => setRecords(response.data))
      .catch(err => console.log(err));
  });
  
  const deleteRecord = (e, id) => {
    e.preventDefault();
    console.log(id);
    axios.delete(`http://${ADDRESS}:${PORT}/record/delete/` + id)
      .then(response => console.log(response.data));
    setRecords([]);
  }
  
  const recordList = () =>
    records.map(currentRecord =>
      <Record
        record={currentRecord}
        deleteRecord={e => deleteRecord(e, currentRecord._id)}
        key={currentRecord._id}
      />
    );
  
  return (
    <div>
      <h3>Record List</h3>
      {recordList()}
    </div>
  );
}

export default RecordList;