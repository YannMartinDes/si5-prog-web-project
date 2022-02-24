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



export default function GlobalMap({markersList}:
{markersList:GasStationPosition[]})
{
  const [position] = useContext(GeolocalisationContext)
  const [map,setMap]:[Map,any] = useContext(MapContext);
  
  

    return(
        <div id='map' className='mapDisplayer'>
            <MapContainer center={[position.lat,position.lon]} zoom={13} zoomControl = {false} scrollWheelZoom={false} whenCreated={setMap}>
              <PositionUpdater />
              <TileLayer className='map-tiles' attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
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
