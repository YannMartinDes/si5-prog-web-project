import "../left-menu/LeftSideMenu.scss"
import { GasStationInfo } from '@web/common/dto'
import FavStationElement from "./FavStationElement"
import "./FavStationMenu.scss"
import { useNavigateNoUpdates } from "../../context/RouterUtils"

export default function FavStationMenu({favoriteStationList}:{favoriteStationList:GasStationInfo[]}) {
  const navigate = useNavigateNoUpdates()

  function onBackClick(){
    navigate("/");
  }

  return (
    <div className='favMenu'>
      <h2>Stations favorites</h2>
      {favoriteStationList.length===0?"Acune station":
        <div className="favoriteList">
          {favoriteStationList.map((favStation) => {
            return <FavStationElement key={favStation.id} favoriteStation={favStation}/>
          })}
        </div>
      }
      <button className='buttonStyle' onClick={(e)=>{onBackClick()}} >{"<< Liste des stations"}</button>
    </div>
  )
}
