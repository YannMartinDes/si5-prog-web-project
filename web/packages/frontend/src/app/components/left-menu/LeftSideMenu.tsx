import "./LeftSideMenu.scss"
import { GasStationPosition } from '@web/common/dto'
import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { FRONT_STATION_ID } from '../../const/url.const'
import StationDetailed from './StationDetailed'
import StationList from './StationList'
import { AuthContext } from "../../context/AuthContext"
import FavStationMenu from "../favorite-stations/FavStationMenu"

export default function LeftSideMenu({gasStationList}:{gasStationList:GasStationPosition[]}) {
  const { favoriteStations, isLogged} = useContext(AuthContext)

  return (
    <div className='sideMenu'>
        <Routes>
            <Route path={FRONT_STATION_ID+":id"} element={<StationDetailed/>}/>
            {isLogged && <Route path="favoris" element={<FavStationMenu favoriteStationList={favoriteStations} />}/>}
            <Route path="/*" element={<StationList />}/>
        </Routes>
    </div>
  )
}
