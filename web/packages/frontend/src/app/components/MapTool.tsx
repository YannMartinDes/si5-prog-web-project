import "./MapTool.scss"
import { Map } from 'leaflet';
import React, { useContext, useEffect, useState } from 'react'
import { GeolocalisationContext } from '../context/GeolocalisationContext'
import { MapContext } from '../context/MapContext';

export default function MapTool() {

    const {position} = useContext(GeolocalisationContext);
    const [map,setMap]:[Map, any] = useContext(MapContext);
    const [userMove, setUserMove] = useState(false);

    const onDragEnd = ()=>{
        setUserMove(true);
    };

    const onRecenterClick = ()=>{
        setUserMove(false);
        map.setView([position.lat, position.lon],13);
    }

    useEffect(()=>{//map est null à l'instanciation
        if(map)     
            map.on("dragend",onDragEnd);
    },[map])

    return (
        <div>
            {userMove && <button className='buttonStyle' onClick={onRecenterClick}>Recentrer sur ma position</button>}
            <div className='positionLegend'>
                Position : {position.lat} , {position.lon}
            </div>
        </div>
    )
}
