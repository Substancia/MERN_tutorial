import React from 'react';
import { Route } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';

import { Create, Edit, RecordList, Navbar } from './components';

function App() {
  return (
    <div>
      <Navbar />
      <Route exact path='/'>
        <RecordList />
      </Route>
      <Route path='/create'>
        <Create />
      </Route>
      <Route path='/edit/:id' component={Edit} />
    </div>
  );
}

export default App;
