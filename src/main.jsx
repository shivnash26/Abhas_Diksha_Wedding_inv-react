/*
 * main.jsx — the starting point. index.html loads this file.
 *
 * It finds <div id="root"> in index.html and tells React to draw <App /> inside it.
 * (In Angular, main.ts did the same job with bootstrapApplication(AppComponent).)
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Importing a CSS file applies it to the whole page (Vite bundles it for you).
import './styles/global.css';
import './styles/sections.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode only affects development: it runs some code twice on purpose
  // to catch bugs. It does nothing on the live site.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
