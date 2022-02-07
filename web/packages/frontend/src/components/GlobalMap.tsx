/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import GasStationPosition from 'packages/common/dto/src/lib/gas-station-position';
import Position from 'packages/common/dto/src/lib/position';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapMarker from './MapMarker';

export default function GlobalMap({markersList,position}:
{markersList:GasStationPosition[],
position:Position}) 
{
    return(
        <div id='map'>
            <MapContainer center={[position.lat,position.lon]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markersList.map((value,index) => {return (<MapMarker gasStation={value}/>)})}
            </MapContainer>
        </div>
    );
}
