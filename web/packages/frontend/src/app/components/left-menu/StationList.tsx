import "./StationList.scss"
import { GasStationPosition } from '@web/common/dto'
import React, { useState } from 'react'
import StationListElement from './StationListElement'
import { TailSpin } from "react-loader-spinner"
import { stat } from "fs"

export default function StationList({stationList}:
    {stationList:GasStationPosition[]}) {
    
  const [isAscending, setIsAscending] = useState(true);


  const sortAscending = (a:GasStationPosition,b:GasStationPosition)=>{
    if(a.address < b.address) return -1;
    if(a.address > b.address) return 1;
    return 0; 
  }

  const sortDescending = (a:GasStationPosition,b:GasStationPosition)=>{
    if(a.address > b.address) return -1;
    if(a.address < b.address) return 1;
    return 0; 
  }

  const sortListClick = ()=>{
    let sortMethod = null;
    stationList.sort((a,b)=> {
      isAscending? sortMethod = sortAscending: sortMethod = sortDescending
      return sortMethod(a,b);
    })
    setIsAscending(!isAscending);
  }

  return (
    <div className='stationList'>
      <h1>Stations Essences :</h1>
      {(stationList.length) !== 0 ?
        (<div>
          <button className="buttonStyle" onClick={sortListClick}>Trier A-Z</button>
          {stationList.map((station)=>{
            return <StationListElement key={station.id} gasStation={station}/>
          })}
        </div>)
      :(
        <div>
          <h2>Chargement...</h2>
          <TailSpin color="#063d44" width={60} height={60}/>  
        </div>)}
    </div>
  )
}
