import { GasStationPosition } from '@web/common/dto'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FRONT_STATION_ID } from '../const/url.const';

export default function StationListElement({gasStation}:
    {gasStation:GasStationPosition}) {

  const navigate = useNavigate();

  return (
    <div onClick={(e)=>{navigate(FRONT_STATION_ID+gasStation.id)}}>
        <h1>{gasStation.address}</h1>
        {gasStation.prices.map((value) => {
            const priceText = value.gasType+" : "+value.price+"€";
            return (<p key={value.gasType}>{priceText} <br/></p>)}   
        )}
    </div>
  );
}
