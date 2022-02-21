import "./GlobalMap.scss"
import { GasStationPosition, Position } from '@web/common/dto';
import { useContext, useState } from 'react';
import {MapContainer, TileLayer, useMap, ZoomControl} from 'react-leaflet';
import MapMarker from './MapMarker';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { GeolocalisationContext } from "../context/GeolocalisationContext";
import PositionUpdater from "./PositionUpdater";
import { MapContext } from "../context/MapContext";
import { control, Map } from "leaflet";

export default function GlobalMap({markersList}:
{markersList:GasStationPosition[]})
{
  const {position} = useContext(GeolocalisationContext)
  
  const [map,setMap]:[Map,any] = useContext(MapContext);
    return(
        <div id='map' className='mapDisplayer'>
            <MapContainer center={[position.lat,position.lon]} zoom={13} zoomControl = {false} scrollWheelZoom={false} whenCreated={setMap}>
              <PositionUpdater />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position = "bottomright"/>
                <MarkerClusterGroup >
                  {markersList.map((value,index) => {return (<MapMarker key={value.id} gasStation={value} />)})}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
}
