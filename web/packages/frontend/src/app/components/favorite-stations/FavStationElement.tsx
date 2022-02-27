import { GasStationPosition } from '@web/common/dto'
import React, { useContext } from 'react'
import { Map } from 'leaflet';
import { MapContext } from '../../context/MapContext';
import { useNavigateNoUpdates } from '../../context/RouterUtils';
import { FRONT_STATION_ID } from '../../const/url.const';

export default function FavStationElement({favoriteStation}:{favoriteStation:GasStationPosition}) {
  const navigate = useNavigateNoUpdates();
  const [map,setMap]:[Map,any] = useContext(MapContext);
  
  const onStationElementClick = (e:any) =>{
    navigate(FRONT_STATION_ID+favoriteStation.id);
    map.setView([favoriteStation.position.lat, favoriteStation.position.lon],17);
  }

  return (
    <div className='favStationElement' onClick={onStationElementClick}>
        <h3>{favoriteStation.address}</h3>
        {favoriteStation.prices.map((price)=>{
            const priceText = price.gasType + " : "+price.price+"€";
            return <span>{priceText}</span>
        })}
    </div>
  )
}
