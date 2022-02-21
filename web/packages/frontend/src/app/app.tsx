import { Route, Routes } from 'react-router-dom';
import MapPage from './components/pages/Map.page';
import ChartPage from './components/pages/Chart.page';
import { FilterStationContextProvider } from './context/FilterStationContext';
import { GeolocalisationContextProvider } from './context/GeolocalisationContext';
import { MapContextProvider } from './context/MapContext';
import FilterBar from './components/FilterBar';

function App() {

  return (
    <MapContextProvider>
      <GeolocalisationContextProvider>
        <FilterStationContextProvider>
          <FilterBar />
          <Routes >
            <Route path='/*' element={<MapPage/>}/>
            <Route path='/chart' element={<ChartPage/>}/>
          </Routes>
        </FilterStationContextProvider>
      </GeolocalisationContextProvider>
    </MapContextProvider>
  );

}

export default App;
