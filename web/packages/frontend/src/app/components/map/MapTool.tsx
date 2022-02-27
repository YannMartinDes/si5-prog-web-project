import { Map } from 'leaflet';
import React, { useContext, useEffect, useState } from 'react'
import { GeolocalisationContext } from '../../context/GeolocalisationContext';
import { MapContext } from '../../context/MapContext';
import "./MapTool.scss"
export default function MapTool() {

    const {userPosition,searchPosition,setSearchPosition}= useContext(GeolocalisationContext);
    const {map}:{map:Map} = useContext(MapContext);
    const [userMove, setUserMove] = useState(false);

    const onDragEnd = ()=>{
        setUserMove(true);
    };

    const onRecenterClick = ()=>{
        setUserMove(false);
        setSearchPosition(userPosition)
        map.setView([userPosition.lat, userPosition.lon],13);
    }
    const onRecenterInfo = ()=>{
        const posUpdate=map.getCenter()
        setSearchPosition({lat:posUpdate.lat,lon:posUpdate.lng})
    }

    useEffect(()=>{//map est null à l'instanciation
        if(map) {
            map.on("dragend",onDragEnd);
           
        }
    },[map])

    return (
        <div className="toolBar">
            <div className='map-button'>
                <button className='buttonStyle' onClick={onRecenterInfo}>Afficher les stations de la zone</button>
                {userMove && <button className='buttonStyle' onClick={onRecenterClick}>Recentrer sur ma position</button>}
            </div>
        </div>
    )
}
