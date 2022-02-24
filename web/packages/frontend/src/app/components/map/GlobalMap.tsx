import "./GlobalMap.scss"
import { GasStationPosition } from '@web/common/dto';
import { useContext, useEffect, useMemo } from 'react';
import {MapContainer, TileLayer, ZoomControl} from 'react-leaflet';
import MapMarker from './MapMarker';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { GeolocalisationContext } from "../../context/GeolocalisationContext";
import PositionUpdater from "./PositionUpdater";
import { MapContext } from "../../context/MapContext";
import { Map } from "leaflet";
import { ThemeContext } from "../../context/ThemeContext";
import L from "leaflet";
import PositionMarker from "./PositionMarker";



const themeDark = L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",{attribution:'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'})
const themeLight = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})

export default function GlobalMap({markersList}:
{markersList:GasStationPosition[]})
{
  const {isDarkTheme} = useContext(ThemeContext)
  const [position] = useContext(GeolocalisationContext)
  const [map,setMap]:[Map,any] = useContext(MapContext);

  
  useEffect(()=>{
    if(map){
      map.eachLayer((layer:any)=>{
        if(layer._url){
          map.removeLayer(layer)
        }
      }
        )
      map.addLayer(isDarkTheme?themeDark:themeLight)
    }
  },[isDarkTheme, map])

    return(
        <div id='map' className='mapDisplayer'>
            <MapContainer center={[position.lat,position.lon]} zoom={13} zoomControl = {false} scrollWheelZoom={false} whenCreated={setMap}>
              <PositionUpdater />
              <TileLayer attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
              <ZoomControl position = "bottomright"/>
              <MarkerClusterGroup >
                {markersList.map((value,index) => {return (<MapMarker key={value.id} gasStation={value} />)})}
              </MarkerClusterGroup>
              <PositionMarker position={position}/>
            </MapContainer>
        </div>
    );
}
