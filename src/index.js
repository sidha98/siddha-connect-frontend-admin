import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Force light mode in localStorage
localStorage.setItem('toolpad-color-scheme-dark', 'light');
localStorage.setItem('toolpad-mode', 'light'); // Optional, if you want to lock the mode

// Using the new createRoot API in React
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
