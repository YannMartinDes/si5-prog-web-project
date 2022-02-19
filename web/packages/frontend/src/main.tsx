import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';

import { FilterStationContextProvider } from './app/context/FilterStationContext';
import RouterUtils from './app/context/RouterUtils';


ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <RouterUtils>
        <FilterStationContextProvider>
          <App />
        </FilterStationContextProvider>
      </RouterUtils>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
