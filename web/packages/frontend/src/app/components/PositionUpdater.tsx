import { Position } from 'packages/common/dto/src/lib/position';
import React, { useContext, useEffect, useState } from 'react'
import { useMap } from 'react-leaflet';
import { GeolocalisationContext } from '../context/GeolocalisationContext';

export default function PositionUpdater() {
    const [position,setPosition] = useContext(GeolocalisationContext)
    const [lastPos,setLastPos] = useState<Position>({lat:43.675819, lon:7.289429});
    const map = useMap();

    useEffect(()=>{
        if(lastPos != position){
            setLastPos(position);
            map.setView([position.lat, position.lon], 13);
        }
    },[position])

    return (
        null
    )
}
