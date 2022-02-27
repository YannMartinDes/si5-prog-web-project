import { GasStationPosition } from '@web/common/dto'
import { Map } from 'leaflet';
import React, { useContext } from 'react'
import { FRONT_STATION_ID } from '../../const/url.const';
import { GeolocalisationContext } from '../../context/GeolocalisationContext';
import { MapContext } from '../../context/MapContext';
import { useNavigateNoUpdates } from '../../context/RouterUtils';

export default function StationListElement({gasStation}:
    {gasStation:GasStationPosition}) {

  const navigate = useNavigateNoUpdates();
  const {map}:{map:Map} = useContext(MapContext);
  const {userPosition,searchPosition,setSearchPosition} = useContext(GeolocalisationContext)
  const onStationElementClick = (e:any) =>{
    navigate(FRONT_STATION_ID+gasStation.id);
    map.setView([gasStation.position.lat, gasStation.position.lon],17);
    setSearchPosition({lat:gasStation?.position?.lat, lon: gasStation?.position?.lon})
  }

  return (
    <div className='stationListElement' onClick={onStationElementClick}>
        <h2>{gasStation.address}</h2>
        {gasStation.prices.map((value) => {
            const priceText = value.gasType+" : "+value.price+"€";
            return (<p key={value.gasType}>{priceText} <br/></p>)}   
        )}
    </div>
  );
}
