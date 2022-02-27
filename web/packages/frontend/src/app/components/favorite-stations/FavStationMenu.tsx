import "../left-menu/LeftSideMenu.scss"
import { GasStationInfo } from '@web/common/dto'
import FavStationElement from "./FavStationElement"

export default function FavStationMenu({favoriteStationList}:{favoriteStationList:GasStationInfo[]}) {

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
