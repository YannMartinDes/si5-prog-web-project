import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import 'leaflet/dist/leaflet.css';
import { FilterStationContextProvider } from './app/context/FilterStationContext';


ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
    <FilterStationContextProvider>

        <App />
      </FilterStationContextProvider>

    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
