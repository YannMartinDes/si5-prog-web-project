import { GasStationPosition } from '@web/common/dto'
import React from 'react'
import StationListElement from './StationListElement'

export default function StationList({stationList}:
    {stationList:GasStationPosition[]}) {
  return (
    <div>
        {stationList.map((station)=>{
            return <StationListElement gasStation={station}/>
        })}
    </div>
  )
}
