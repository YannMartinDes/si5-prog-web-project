import { GasStationPosition } from '@web/common/dto'
import React from 'react'

export default function StationListElement({gasStation, onStationClick}:
    {gasStation:GasStationPosition,
    onStationClick:(Id:string)=>void}) {


  return (
    <div onClick={(e)=>{onStationClick(gasStation.id)}}>
        <h1>{gasStation.address}</h1>
        {gasStation.prices.map((value) => {
            const priceText = value.gasType+" : "+value.price+"€";
            return (<p key={value.gasType}>{priceText} <br/></p>)}   
        )}
    </div>
  );
}
