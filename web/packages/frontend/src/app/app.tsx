/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import styles from './app.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import axios from 'axios';
import GlobalMap from './components/GlobalMap';
import { Filter, GasStationInfo, GasStationPosition, Position } from '@web/common/dto';
import SideMenu from './components/StationDetailed';
import FilterBar from './components/FilterBar';
import StationListElement from './components/StationListElement';
import StationDetailed from './components/StationDetailed';
import StationList from './components/StationList';
import { FilterStationContext, FilterStationContextProvider } from './context/FilterStationContext';



//Extend marker prototype to fix : https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found
const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const ALL_STATION_URL = "http://localhost:3333/api/station/near-station"
const FIND_URL = "http://localhost:3333/api/station/find"
const STATION_INFO = "http://localhost:3333/api/station/stations"

const range = 20000


function App() {
  const [query, setQuery] = useState(" ")
  const [stationList,setStationList] = useState<GasStationPosition[]>([]);
  const [gasStationInfo,setGasStationInfo] = useState<GasStationInfo>();
  const [position, setPosition] = useState<Position>({lat:43.675819, lon:7.289429});
  const {state} = useContext(FilterStationContext)


  //const testPos:Position = navigator.geolocation.getCurrentPosition(onPositionChange());

  function getAllStation(currentPos:Position, radius:number, filter:Filter) {
    console.log("CALL BACKEND FOR ALL STATION " + JSON.stringify(currentPos));
    axios.get(ALL_STATION_URL, { params: { latitude: currentPos.lat, longitude: currentPos.lon, maxDist: radius, filter:filter } })
       .then(res => {
          //console.log("Receive response "+JSON.stringify(res));
          const stations:GasStationPosition[] = res.data;
          setStationList(stations);
       });
  }

  function getStationInfo(stationId:string) {
    console.log("CALL BACKEND FOR STATION INFO "+stationId)
    axios.get(STATION_INFO+"/"+stationId)
       .then(res => {
          //console.log("Receive response "+JSON.stringify(res))
          setGasStationInfo(res.data);
       });
  }
  function getAllStationByText(text:string){
    console.log("CALL BACKEND FOR ALL STATION")
    axios.get(FIND_URL, { params: {text:text,caseSensitive:false} })
       .then(res => {
          //console.log("Receive response "+JSON.stringify(res));
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


  const onStationClick = (stationId:string) =>{
    getStationInfo(stationId)
    // setGasStationInfo({id:"station test", address:"Station de mon cul",
    //   prices:[{price:"50.5",gasType:"E10"},{price:"70.5",gasType:"SP98"}],
    //   services:["Station de gonflage", "Location de véhicule"],
    //   schedules:[{day:"Lundi", openned:true,hourSchedule:[{openHour:"8h00", closedHour:"22h00"}]},
    //     {day:"Mardi", openned:true,hourSchedule:[{openHour:"8h00", closedHour:"12h00"},{openHour:"14h00", closedHour:"22h00"}] },{day:"Samedi",openned:false}]})
  }


  const onPositionChange = (lat:number, lon:number) => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('Position : updated');
      setPosition({lat: position.coords.latitude, lon: position.coords.longitude});
    })
    //setPosition({lat: lat, lon: lon});
  }




  function handleClick() {
    getAllStationByText(query)
   }

  return (
      <div>
        <input placeholder="Rechercher.." onChange={event => setQuery(event.target.value)} />
        <button onClick={handleClick} name="button">Cliquer pour rechercher  </button>
        <FilterBar />
        <StationDetailed gasStationInfo={gasStationInfo}/>
        <GlobalMap markersList={stationList} position={position} onMarkerClick={onStationClick}/>
        <div>
          Position : {position.lat} , {position.lon}
        </div>
        <StationList stationList={stationList} onElementClick={onStationClick} />
      </div>
  );
}

export default App;
