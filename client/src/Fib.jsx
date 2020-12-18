import React, { useState, useEffect } from 'react';

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);  
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  useEffect(() => {
    fetchValues();
    fetchIndices();
  }, []);

  const fetchValues = async () => {
    try {
      const response = await fetch('/api/values/current');
      const values = await response.json();
      setValues(values);
    } catch(err) {
      console.error(err);
    }
  }

  const fetchIndices = async () => {
    try {
      const response = await fetch('/api/values/all');
      const seenIndexes = await response.json();
      setSeenIndexes(seenIndexes.data);
    } catch(err) {
      console.error(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/values', {
      method: 'POST',
      body: JSON.stringify({
        index
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setIndex('');
  }

  const renderSeenIndices = () => {
    return seenIndexes?.map(({ number }) => (<div key={number}>{number}</div>)).join(', ');
  }

  const renderCalculatedValues = () => {
    const entries = [];
    for(let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      )
    }
    return entries;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index</label>
        <input 
          value={index} 
          onChange={e => setIndex(e.target.value)} 
        />
        <button type='submit'>submit</button>
      </form>
      <h3>Indices I have seen</h3>
      {renderSeenIndices()}
      <h3>Calculated values</h3>
      {renderCalculatedValues()}
    </div>
  );
}

export default Fib;