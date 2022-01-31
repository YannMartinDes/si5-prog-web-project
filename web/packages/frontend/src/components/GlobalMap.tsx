import GasStationPosition from 'packages/common/dto/src/lib/gas-station-position';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapMarker from './MapMarker';

export default function GlobalMap({markersList}:
{markersList:GasStationPosition[]}) 
{
    return(
        <div id='map'>
            <MapContainer center={[46.25000, 5.64400]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markersList.map((value,index) => {return (<MapMarker popupText={value.id} position={value.position}/>)})}
            </MapContainer>
        </div>
    );
}
