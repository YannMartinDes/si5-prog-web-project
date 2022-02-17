import { GasStationPosition } from '@web/common/dto'
import React from 'react'
import StationListElement from './StationListElement'

export default function StationList({stationList, onElementClick}:
    {stationList:GasStationPosition[],
    onElementClick:(Id:string)=>void}) {
  return (
    <div>
        {stationList.map((station)=>{
            return <StationListElement gasStation={station} onStationClick={onElementClick}/>
        })}
    </div>
  )
}
