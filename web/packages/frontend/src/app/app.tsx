import { Route, Routes } from 'react-router-dom';
import MapPage from './components/pages/Map.page';
import ChartPage from './components/pages/Chart.page';
import { FilterStationContextProvider } from './context/FilterStationContext';
import { GeolocalisationContextProvider } from './context/GeolocalisationContext';

function App() {

  return (
    <GeolocalisationContextProvider>
      <FilterStationContextProvider>
        <Routes >
          <Route path='/*' element={<MapPage/>}/>
          <Route path='/chart' element={<ChartPage/>}/>
        </Routes>
      </FilterStationContextProvider>
    </GeolocalisationContextProvider>
  );

}

export default App;
