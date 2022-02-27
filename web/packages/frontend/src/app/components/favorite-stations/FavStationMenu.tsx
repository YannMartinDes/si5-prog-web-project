import "../left-menu/LeftSideMenu.scss"
import { GasStationPosition } from '@web/common/dto'
import React from 'react'
import FavStationElement from "./FavStationElement"

export default function FavStationMenu({favoriteStationList}:{favoriteStationList:GasStationPosition[]}) {
  return (
    <div className='favMenu'>
      <h2>Stations favorites</h2>
      <ul>
        {favoriteStationList.map((favStation) => {
          return <FavStationElement favoriteStation={favStation}/>
        })}
      </ul>
    </div>
  )
}
