/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import styles from './app.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import axios from 'axios';
import GlobalMap from './components/GlobalMap';
import { Filter, GasStationPosition, Position } from '@web/common/dto';
import FilterBar from './components/FilterBar';
import { ALL_STATION_URL, BACKEND_BASE_URL, FIND_URL, FRONT_STATION_ID } from './const/url.const';
import { FilterStationContext } from './context/FilterStationContext';
import LeftSideMenu from './components/LeftSideMenu';

//Extend marker prototype to fix : https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found
const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;
const range = 20000


function App() {
  const [stationList,setStationList] = useState<GasStationPosition[]>([]);
  const [position, setPosition] = useState<Position>({lat:43.715819, lon:7.289429});
  const {state} = useContext(FilterStationContext)

  function getAllStation(currentPos:Position, radius:number, filter:Filter) {
    console.log("CALL BACKEND FOR ALL STATION " + JSON.stringify(currentPos));
    axios.get(BACKEND_BASE_URL+ALL_STATION_URL, { params: { latitude: currentPos.lat, longitude: currentPos.lon, maxDist: radius, filter:filter } })
       .then(res => {
          //console.log("Receive response "+JSON.stringify(res));
          const stations:GasStationPosition[] = res.data;
          setStationList(stations);
       });
  }

  function getAllStationByText(text:string){
    console.log("CALL BACKEND FOR SEARCH TEXT")
    axios.get(BACKEND_BASE_URL+FIND_URL, { params: {text:text,caseSensitive:false} })
       .then(res => {
          const stations:GasStationPosition[] = res.data;
          setStationList(stations);
       });
  }

  useEffect(()=>{//== ComponentDidMount
    let pos = position;
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('Position : updated');
        pos = {lat: position.coords.latitude, lon: position.coords.longitude};
        setPosition(pos);
      })
    } else {
      console.log('Impossible to use location');
    }
    getAllStation(pos,range,{
      gas: state.gasFilter, 
      services: state.servicesFilter,
      schedules: []
    });
    //setStationList([{id:"station test",position:{lat:43.675819,lon:7.289429},prices:[{price:"50.5",gasType:"E10"},{price:"70.5",gasType:"SP98"}], address:"rue de mon cul"}])
  },[])

  useEffect(()=>{//== ComponentDidMount
    console.log(state)
    getAllStation(position,range,{
      gas: state.gasFilter, 
      services: state.servicesFilter,
      schedules: []
    });
    //setStationList([{id:"station test",position:{lat:43.675819,lon:7.289429},prices:[{price:"50.5",gasType:"E10"},{price:"70.5",gasType:"SP98"}], address:"rue de mon cul"}])
  },[state, position])

  return (
    <div>
      <FilterBar />
      <div className='grid-warpper'>
        <div className='grid-side-menu'>
          <LeftSideMenu gasStationList={stationList} />
        </div>
        <div className='grid-map'>
          <GlobalMap markersList={stationList} position={position}/>
          <div className='positionLegend'>
            Position : {position.lat} , {position.lon}
          </div>
        </div>
      </div>
    </div>
  );
  /*


  */
}

export default App;
