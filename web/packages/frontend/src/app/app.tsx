/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import styles from './app.module.scss';
import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import axios from 'axios';
import GlobalMap from './components/GlobalMap';
import { GasStationPosition, Position } from '@web/common/dto';


//Extend marker prototype to fix : https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found
const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const ALL_STATION_URL = "http://localhost:3333/api/get-near-station/"

function App() {

  const [stationList,SetStationList] = useState<GasStationPosition[]>([]);

  function getAllStation(currentPos:Position, radius:number) {
    axios.get(ALL_STATION_URL, { params: { lat: currentPos.lat, lon: currentPos.lon, radius: radius } })
       .then(res => {
           SetStationList(res.data);
       });
 }

  const currentPos:Position = {lat:43.675819, lon:7.289429}
  //getAllStation(currentPos,10000);

 SetStationList([{id:"test",position:{lat:43.675819,lon:7.289429},prices:[{price:"50.5",gasType:"E10"}], address:"rue de mon cul"}])

  return (
    <>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
      <Route
        path="/"
        exact
        render={() => (
          <GlobalMap markersList={stationList} position={currentPos}/>
        )}
      />
    </>
  );
}

export default App;
