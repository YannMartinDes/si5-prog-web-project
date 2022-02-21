/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useContext, useEffect, useState } from 'react';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import axios from 'axios';
import { Filter, GasStationPosition, Position } from '@web/common/dto';
import LeftSideMenu from '../LeftSideMenu';
import { FilterStationContext } from '../../context/FilterStationContext';
import { ALL_STATION_URL, BACKEND_BASE_URL, FIND_URL } from '../../const/url.const';
import FilterBar from '../FilterBar';
import GlobalMap from '../GlobalMap';
import { GeolocalisationContext } from '../../context/GeolocalisationContext';
import MapTool from '../MapTool';
import Slider from '../Slider';

//Extend marker prototype to fix : https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found
const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;
const range = 20000


export default function MapPage() {
  const [stationList,setStationList] = useState<GasStationPosition[]>([]);
  const {state} = useContext(FilterStationContext)
  const {position} = useContext(GeolocalisationContext)


  function getAllStation(currentPos:Position, radius:number, filter:Filter) {
    console.log("CALL BACKEND FOR ALL STATION " + JSON.stringify(currentPos));
    axios.get(BACKEND_BASE_URL+ALL_STATION_URL, { params: { latitude: currentPos.lat, longitude: currentPos.lon, maxDist: radius, filter:filter } })
       .then(res => {
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
    getAllStation(position,state.rangeSlider,{
      gas: state.gasFilter, 
      services: state.servicesFilter,
      schedules: []
    });
  },[state, position])

  return (
    <div>
      <FilterBar />
      <div className='grid-warpper'>
        <div className='grid-side-menu'>
          <LeftSideMenu gasStationList={stationList} />
        </div>
        <div className='grid-map'>
          <GlobalMap markersList={stationList}/>
          <MapTool />
        </div>
      </div>
    </div>
  );
}
