/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import styles from './app.module.scss';
import React, { useEffect, useState } from 'react';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import axios from 'axios';
import GlobalMap from './components/GlobalMap';
import { Filter, GasStationInfo, GasStationPosition, Position } from '@web/common/dto';
import FilterBar from './components/FilterBar';
import StationDetailed from './components/StationDetailed';
import StationList from './components/StationList';
import { ALL_STATION_URL, BACKEND_BASE_URL, FIND_URL, STATION_INFO } from './const/url.const';
import { Route, Routes, useNavigate} from 'react-router-dom';

//Extend marker prototype to fix : https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found
const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;
const range = 20000


function App() {
  const [query, setQuery] = useState(" ")
  const [stationList,setStationList] = useState<GasStationPosition[]>([]);
  const servicesList:string[]=[
  "Aire de camping-cars",
  "Bar",
  "Bornes électriques",
  "Boutique alimentaire",
  "Boutique non alimentaire",
  "Carburant additivé",
  "DAB (Distributeur automatique de billets)",
  "Douches",
  "Espace bébé",
  "GNV",
  "Lavage automatique",
  "Lavage manuel",
  "Laverie",
  "Location de véhicule",
  "Piste poids lourds",
  "Relais colis",
  "Restauration à emporter",
  "Restauration sur place",
  "Services réparation / entretien",
  "Station de gonflage",
  "Toilettes publiques",
  "Vente d'additifs carburants",
  "Vente de fioul domestique",
  "Vente de gaz domestique (Butane, Propane)",
  "Vente de pétrole lampant",
  "Wifi"]
  const [filter, setFilter] = useState<Filter>({gas:['Gazole', 'SP95','E85', 'GPLc', 'E10', 'SP98'],schedules:[],services:servicesList});
  const [position, setPosition] = useState<Position>({lat:43.675819, lon:7.289429});

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
    console.log("CALL BACKEND FOR ALL STATION")
    axios.get(BACKEND_BASE_URL+FIND_URL, { params: {text:text,caseSensitive:false} })
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
    getAllStation(pos,range,filter);
    //setStationList([{id:"station test",position:{lat:43.675819,lon:7.289429},prices:[{price:"50.5",gasType:"E10"},{price:"70.5",gasType:"SP98"}], address:"rue de mon cul"}])
  },[])

  useEffect(()=>{//== ComponentDidMount
    console.log(filter)
    getAllStation(position,range,filter);
    //setStationList([{id:"station test",position:{lat:43.675819,lon:7.289429},prices:[{price:"50.5",gasType:"E10"},{price:"70.5",gasType:"SP98"}], address:"rue de mon cul"}])
  },[filter, position])

  const onFilterCheckBoxClick = (type:string, gas:string, checked:boolean) =>{
    if(type === "gas"){
      let newGasFilter:string[]|undefined;
      if(checked){
        newGasFilter = filter.gas.concat([gas]);
      }
      else{
        newGasFilter = filter?.gas.filter((el) =>{return el !== gas});
      }
      setFilter({gas:newGasFilter, services:filter.services,schedules:filter.schedules})
    }
    if(type === "services"){
      let newServiceFilter:string[]|undefined;
      if(checked){
        newServiceFilter = filter.services.concat([gas]);
      }
      else{
        newServiceFilter = filter?.services.filter((el) =>{return el !== gas});
      }
      setFilter({gas:filter.gas, services:newServiceFilter,schedules:filter.schedules})
    }
  }

  function handleClick() {
    getAllStationByText(query)
   }

  return (
    <div>
      <input placeholder="Rechercher.." onChange={event => setQuery(event.target.value)} />
      <button onClick={handleClick} name="button">Cliquer pour rechercher  </button>
      <FilterBar onCheckBoxClick={onFilterCheckBoxClick} />
      <GlobalMap markersList={stationList} position={position}/>
      <div>
        Position : {position.lat} , {position.lon}
      </div>
      <Routes>
        <Route path="/" element={<StationList stationList={stationList}/>}/>
        <Route path="/station/:id" element={<StationDetailed/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
