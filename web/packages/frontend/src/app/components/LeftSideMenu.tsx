import "./LeftSideMenu.scss"
import { GasStationPosition } from '@web/common/dto'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { FRONT_STATION_ID } from '../const/url.const'
import StationDetailed from './StationDetailed'
import StationList from './StationList'

export default function LeftSideMenu({gasStationList}:{gasStationList:GasStationPosition[]}) {
  return (
    <div className='sideMenu'>
        <Routes>
            <Route path="/" element={<StationList stationList={gasStationList}/>}/>
            <Route path={FRONT_STATION_ID+":id"} element={<StationDetailed/>}/>
        </Routes>
    </div>
  )
}
