import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async () => {
    try {
      const result = await fetch(
        `/word-cloud?searchTerm=${encodeURIComponent(searchTerm)}`
      ).then(res => res.json());

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
