import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import LoginPage from './app/loginPage'
import SignupPage from './app/signupPage';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';

import RouterUtils from './app/context/RouterUtils';


ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <RouterUtils>
          <App />
      </RouterUtils>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
