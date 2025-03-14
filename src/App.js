import './App.css';
import Form from './components/forms/Form'
import React, { useState } from 'react';

const App = () => {

  const [data, setData] = useState([]);

  return (
    
    <div >
      <Form/>
    </div>
  );
}

export default App;
