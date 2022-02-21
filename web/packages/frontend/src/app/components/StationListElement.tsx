import { GasStationPosition } from '@web/common/dto'
import React from 'react'
import { FRONT_STATION_ID } from '../const/url.const';
import { useNavigateNoUpdates } from '../context/RouterUtils';

export default function StationListElement({gasStation}:
    {gasStation:GasStationPosition}) {

  const navigate = useNavigateNoUpdates();

  return (
    <div className='stationListElement' onClick={(e)=>{navigate(FRONT_STATION_ID+gasStation.id)}}>
        <h2>{gasStation.address}</h2>
        {gasStation.prices.map((value) => {
            const priceText = value.gasType+" : "+value.price+"€";
            return (<p key={value.gasType}>{priceText} <br/></p>)}   
        )}
    </div>
  );
}
