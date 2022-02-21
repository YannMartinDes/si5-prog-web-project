import "./StationList.scss"
import { GasStationPosition } from '@web/common/dto'
import React from 'react'
import StationListElement from './StationListElement'

export default function StationList({stationList}:
    {stationList:GasStationPosition[]}) {
  return (
    <div className='stationList'>
      <h1>Stations Essences :</h1>
        {stationList.map((station)=>{
            return <StationListElement gasStation={station}/>
        })}
    </div>
  )
}
