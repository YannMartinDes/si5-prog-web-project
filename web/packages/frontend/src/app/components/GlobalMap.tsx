import "./GlobalMap.scss"
import { GasStationPosition, Position } from '@web/common/dto';
import { useContext, useState } from 'react';
import {MapContainer, TileLayer, useMap} from 'react-leaflet';
import MapMarker from './MapMarker';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { GeolocalisationContext } from "../context/GeolocalisationContext";

export default function GlobalMap({markersList}:
{markersList:GasStationPosition[]})
{

  const [lastPos,setLastPos] = useState<Position>({lat:43.675819, lon:7.289429});
  const {position} = useContext(GeolocalisationContext)

  function ChangeView({ center, zoom}:
  {center:[number,number],zoom: number,}) {
    //console.log("Pos "+JSON.stringify(position)+" -- last "+JSON.stringify(lastPos))
    const map = useMap();
    setLastPos(position);
    map.setView(center, zoom);
    return null;
  }

    return(
        <div id='map' className='mapDisplayer'>
            <MapContainer center={[position.lat,position.lon]} zoom={13} scrollWheelZoom={false}>
              {lastPos !== position && <ChangeView center={[position.lat,position.lon]} zoom={13} />}
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
