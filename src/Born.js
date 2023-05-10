import logo from './logo.svg';
import './App.css';
// Import useState and useEffect hooks from React
import React, { useState, useEffect } from 'react';
// Import the API category from AWS Amplify
import { API } from 'aws-amplify';
import './App.css';

export const Born = () => {
  // Create born variable and set to empty array
  const [born, updateBorn] = useState([]);

  // Create a varible for loading
  const [loading, updateLoading] = useState(true);
  
  // Define function to all API
  const fetchBorn = async() => {
    updateLoading(true);
    const data = await API.get('cryptoapi', `/born`);
    updateBorn(data.born)
    updateLoading(false)
    console.log(data);
  };
  
    // Call fetchBorn function when component loads
    useEffect(() => {
      fetchBorn()
    }, [])
  
    {loading && <h2>Loading...</h2>}
    
    return (
      !loading && <h2>The GitHub user {born.login} was born on {born.created_at}</h2>
    );
};