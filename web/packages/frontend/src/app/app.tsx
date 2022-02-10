/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import styles from './app.module.scss';
import React, { useEffect, useState } from 'react';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import axios from 'axios';
import GlobalMap from './components/GlobalMap';
import { Filter, GasStationInfo, GasStationPosition, Position } from '@web/common/dto';
import SideMenu from './components/SideMenu';
import FilterBar from './components/FilterBar';


//Extend marker prototype to fix : https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found
const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const ALL_STATION_URL = "http://localhost:3333/api/get-near-station/"
const STATION_INFO = "http://localhost:3333/api/get-station-info/"


function App() {
  const currentPos:Position = {lat:43.675819, lon:7.289429}//replace by geolocalisation
  const [stationList,setStationList] = useState<GasStationPosition[]>([]);
  const [gasStationInfo,setGasStationInfo] = useState<GasStationInfo>();
  const [filter, setFilter] = useState<Filter>({gas:['Gazole', 'SP95','E85', 'GPLc', 'E10', 'SP98'],schedules:[],services:[]});

  function getAllStation(currentPos:Position, radius:number) {
    axios.get(ALL_STATION_URL, { params: { lat: currentPos.lat, lon: currentPos.lon, radius: radius } })
       .then(res => {
          setStationList(res.data);
       });
  }

  function getStationInfo(stationId:string) {
    axios.get(STATION_INFO, { params: { stationId:stationId } })
       .then(res => {
           setGasStationInfo(res.data);
       });
  }


  useEffect(()=>{
    //getAllStation(currentPos,10000);
    setStationList([{id:"station test",position:{lat:43.675819,lon:7.289429},prices:[{price:"50.5",gasType:"E10"},{price:"70.5",gasType:"SP98"}], address:"rue de mon cul"}])
  },[])


  const onMarkerClick = (stationId:string) =>{
    //getStationInfo(stationId)
    setGasStationInfo({id:"station test", address:"Station de mon cul", 
      prices:[{price:"50.5",gasType:"E10"},{price:"70.5",gasType:"SP98"}], 
      services:["Station de gonflage", "Location de véhicule"], 
      schedules:[{day:"Lundi", openned:true,hourSchedule:[{openHour:"8h00", closedHour:"22h00"}]},
        {day:"Mardi", openned:true,hourSchedule:[{openHour:"8h00", closedHour:"12h00"},{openHour:"14h00", closedHour:"22h00"}] },{day:"Samedi",openned:false}]})
  }

  const onCheckBoxClick = (gas:string, checked:boolean) =>{
    let newGasFilter:string[]|undefined;
    if(checked){
      newGasFilter = filter.gas.concat([gas]);
    }
    else{
      newGasFilter = filter?.gas.filter((el) =>{return el !== gas});
    }
    setFilter({gas:newGasFilter, services:filter.services,schedules:filter.schedules})
  }

  useEffect(()=>{
    console.log(filter);
  },[filter])

  return (
    <div>
      <FilterBar onCheckBoxClick={onCheckBoxClick} />
      <SideMenu gasStationInfo={gasStationInfo}/>
      <GlobalMap markersList={stationList} position={currentPos} onMarkerClick={onMarkerClick}/>
    </div>
  );
}

export default App;
