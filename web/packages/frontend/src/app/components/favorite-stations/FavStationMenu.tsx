import "../left-menu/LeftSideMenu.scss"
import { GasStationPosition } from '@web/common/dto'
import React from 'react'

export default function FavStationMenu({favoriteStationList}:{favoriteStationList:GasStationPosition[]}) {
  return (
    <div className='sideMenu'>
      <h2>STATIONS FAVORITES</h2>
      <ul>
        {favoriteStationList.map((favStation) => {
          return <li>{favStation.address}</li>
        })}
      </ul>
    </div>
  )
}
