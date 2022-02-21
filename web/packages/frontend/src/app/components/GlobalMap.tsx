import "./GlobalMap.scss"
import { GasStationPosition, Position } from '@web/common/dto';
import { useContext, useState } from 'react';
import {MapContainer, TileLayer, useMap} from 'react-leaflet';
import MapMarker from './MapMarker';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { GeolocalisationContext } from "../context/GeolocalisationContext";
import PositionUpdater from "./PositionUpdater";

export default function GlobalMap({markersList}:
{markersList:GasStationPosition[]})
{
  const {position} = useContext(GeolocalisationContext)
  
    return(
        <div id='map' className='mapDisplayer'>
            <MapContainer center={[position.lat,position.lon]} zoom={13} scrollWheelZoom={false}>
              <PositionUpdater />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup >
                  {markersList.map((value,index) => {return (<MapMarker key={value.id} gasStation={value} />)})}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
}
