import { Position } from 'packages/common/dto/src/lib/position';
import React, { useContext, useEffect, useState } from 'react'
import { useMap } from 'react-leaflet';
import { GeolocalisationContext } from '../../context/GeolocalisationContext';

export default function PositionUpdater() {
    const [lastPos,setLastPos] = useState<Position>({lat:43.675819, lon:7.289429});
    const map = useMap();
    const {userPosition,searchPosition,setSearchPosition} = useContext(GeolocalisationContext)
    useEffect(()=>{
        if(lastPos != searchPosition){
            setLastPos(searchPosition);
            map.setView([searchPosition.lat, searchPosition.lon], 13);
        }
    },[searchPosition])

    return (
        null
    )
}
