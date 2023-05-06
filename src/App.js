import logo from './logo.svg';
import './App.css';
// Import useState and useEffect hooks from React
import React, { useState, useEffect } from 'react';
// Import the API category from AWS Amplify
import { API } from 'aws-amplify';
import './App.css';

const App = () => {
  // Create coins variable and set to empty array
  const [coins, updateCoins] = useState([]);

  // Create additional state to hold user input for limit and start properties
  const [input, updateInput] = useState({ limit: 5, start: 0 });

  // Create a variable for loading
  const [loading, updateLoading] = useState(true);

  // Create a new function to allow users to update the input values
  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value });
  }

  // Define function to all API
  const fetchCoins = async() => {
    updateLoading(true);
    const { limit, start } = input;
    const data = await API.get('cryptoapi', `/coins?limit=${limit}&start=${start}`);
    updateCoins(data.coins);
    updateLoading(false);
  }

  // Call fetchCoins function when component loads
  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <div className="App">      
      <input
        placeholder="start"
        onChange={e => updateInputValues('banana', e.target.value)}
      />
      <input
        onChange={e => updateInputValues('limit', e.target.value)}
        placeholder="limit"
      />
      <button onClick={fetchCoins}>Fetch Coins</button>
      {loading && <h2>Loading...</h2>}
      {
        !loading && coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      }
    </div>
  );
}

export default App
