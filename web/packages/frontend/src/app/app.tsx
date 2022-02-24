import { Route, Routes } from 'react-router-dom';
import MapPage from './components/pages/Map.page';
import ChartPage from './components/pages/Chart.page';
import { FilterStationContextProvider } from './context/FilterStationContext';
import { GeolocalisationContextProvider } from './context/GeolocalisationContext';
import { MapContextProvider } from './context/MapContext';
import FilterBar from './components/FilterBar';
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import NavBar from './components/NavBar';
import {AuthContextProvider} from "./context/AuthContext";

import { MarkerListContextProvider } from './context/MarkListContext';
function App() {

  return (
    <AuthContextProvider>
      <MarkerListContextProvider>
        <MapContextProvider>
          <GeolocalisationContextProvider>
            <FilterStationContextProvider>
              <Routes>
                <Route path="/*" element={<>
                  <NavBar />
                  <Routes>
                    <Route path='/*' element={<MapPage/>}/>
                    <Route path='/chart' element={<ChartPage/>}/>
                  </Routes>
                </>}>
                </Route>
                <Route path='/signup' element={<SignupPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
              </Routes>
            </FilterStationContextProvider>
          </GeolocalisationContextProvider>
        </MapContextProvider>
      </MarkerListContextProvider>
    </AuthContextProvider>);

}

export default App;
