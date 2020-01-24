import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/test').then(res => res.json());
      console.log('result', result);
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const result = await fetch('/word-cloud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm }),
      }).then(res => res.json());
      console.log(result);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          value={searchTerm}
          onChange={event => {
            setSearchTerm(event.target.value);
          }}
        ></input>
        <button onClick={handleSubmit}>GO</button>
      </header>
    </div>
  );
};

export default App;
