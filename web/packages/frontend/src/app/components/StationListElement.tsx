import { GasStationPosition } from '@web/common/dto'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function StationListElement({gasStation}:
    {gasStation:GasStationPosition}) {

  const navigate = useNavigate();

  return (
    <div onClick={(e)=>{navigate("/station/"+gasStation.id)}}>
        <h1>{gasStation.address}</h1>
        {gasStation.prices.map((value) => {
            const priceText = value.gasType+" : "+value.price+"€";
            return (<p key={value.gasType}>{priceText} <br/></p>)}   
        )}
    </div>
  );
}
