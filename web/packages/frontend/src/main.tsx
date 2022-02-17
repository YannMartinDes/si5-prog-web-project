import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import LoginPage from './app/loginPage'
import 'leaflet/dist/leaflet.css';


ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <LoginPage></LoginPage>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
