/* eslint-disable @nrwl/nx/enforce-module-boundaries */

import { GasStationPosition, Position } from '@web/common/dto';
import React from 'react';
import {MapContainer, TileLayer, useMap} from 'react-leaflet';
import MapMarker from './MapMarker';

export default function GlobalMap({markersList,position,onMarkerClick}:
{markersList:GasStationPosition[],
position:Position,
onMarkerClick:(Id:string)=>void})
{
  function ChangeView({ center, zoom}:
  {
    center: any,
    zoom: number,
  }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  console.log('Displaying current position IN MAP: ', JSON.stringify(position));
    return(
        <div id='map'>
            <MapContainer center={[position.lat,position.lon]} zoom={13} scrollWheelZoom={false}>
              <ChangeView center={[position.lat,position.lon]} zoom={13} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markersList.map((value,index) => {return (<MapMarker key={value.id} gasStation={value} onMarkerClick={onMarkerClick}/>)})}
            </MapContainer>
        </div>
    );
}
