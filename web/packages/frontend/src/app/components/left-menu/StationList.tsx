import "./StationList.scss"
import { GasStationPosition } from '@web/common/dto'
import React from 'react'
import StationListElement from './StationListElement'
import { TailSpin } from "react-loader-spinner"

export default function StationList({stationList}:
    {stationList:GasStationPosition[]}) {

  return (
    <div className='stationList'>
      <h1>Stations Essences :</h1>
      {(stationList.length) !== 0 ?
        stationList.map((station)=>{
          return <StationListElement gasStation={station}/>
        }) 
      :(
        <div>
          <h2>Chargement...</h2>
          <TailSpin color="#063d44" width={60} height={60}/>  
        </div>)}
    </div>
  )
}
