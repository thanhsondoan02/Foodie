import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// CSS
import "./core-ui/app.css"
import "./core-ui/responsive.css"
import "./core-ui/leaflet.css"
import './routes/contact/contact.css'

// Components
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
