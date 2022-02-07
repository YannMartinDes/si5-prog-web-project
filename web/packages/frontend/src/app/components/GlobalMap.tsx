/* eslint-disable @nrwl/nx/enforce-module-boundaries */

import { GasStationPosition, Position } from '@web/common/dto';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapMarker from './MapMarker';

export default function GlobalMap({markersList,position,onMarkerClick}:
{markersList:GasStationPosition[],
position:Position,
onMarkerClick:(Id:string)=>void})
{
    return(
        <div id='map'>
            <MapContainer center={[position.lat,position.lon]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markersList.map((value,index) => {return (<MapMarker key={value.id} gasStation={value} onMarkerClick={onMarkerClick}/>)})}
            </MapContainer>
        </div>
    );
}
