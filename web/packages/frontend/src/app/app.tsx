import { Route, Routes } from 'react-router-dom';
import MapPage from './components/pages/Map.page';
import ChartPage from './components/pages/Chart.page';
import { FilterStationContextProvider } from './context/FilterStationContext';
import { MapContextProvider } from './context/MapContext';
import {AuthContextProvider} from "./context/AuthContext";
import { GeolocalisationContextProvider } from './context/GeolocalisationContext';
import NavBar from './components/nav-bar/NavBar';
import SignupPage from './components/pages/SignupPage';
import LoginPage from './components/pages/LoginPage';
import { GasStationPositionContextProvider } from './context/GasStationPositionContext';
function App() {

  return (
    <GasStationPositionContextProvider>
        <AuthContextProvider>
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
        </AuthContextProvider>
    </GasStationPositionContextProvider>);

}

export default App;
