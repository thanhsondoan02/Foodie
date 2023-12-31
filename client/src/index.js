import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// CSS
import "./core-ui/app.css"
import "./core-ui/responsive.css"
import "./core-ui/leaflet.css"
import './routes/contact/contact.css'
import './routes/menu/menu.css'
import './routes/about/About.css'
import './routes/blog/blog.css'
import './routes/register/register.css'
import './components/login/loginFragment.css'

import BigApp from './BigApp';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BigApp />
  </React.StrictMode>
);

reportWebVitals();
