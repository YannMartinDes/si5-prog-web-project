import { Map } from 'leaflet';
import React, { useContext, useEffect, useState } from 'react'
import { GeolocalisationContext } from '../../context/GeolocalisationContext';
import { MapContext } from '../../context/MapContext';
export default function MapTool() {

    const [position,setPosition]= useContext(GeolocalisationContext);
    const [map,setMap]:[Map, any] = useContext(MapContext);
    const [userMove, setUserMove] = useState(false);

    const onDragEnd = ()=>{
        setUserMove(true);
    };

    const onRecenterClick = ()=>{
        setUserMove(false);
        Promise.resolve(navigator.geolocation.getCurrentPosition((position) => {
            const pos = {lat: position.coords.latitude, lon: position.coords.longitude};
            setPosition(pos)
            map.setView([pos.lat, pos.lon],13);
        },(error)=>{console.log(error)}))

    }
    const onRecenterInfo = ()=>{
        const posUpdate=map.getCenter()
        setPosition({lat:posUpdate.lat,lon:posUpdate.lng})
    }

    useEffect(()=>{//map est null à l'instanciation
        if(map) {
            map.on("dragend",onDragEnd);
           
        }
    },[map])

    return (
        <div>
            <div className='positionLegend'>
                Position : {position.lat} , {position.lon}
            </div>
            <button className='buttonStyle' onClick={onRecenterInfo}>Afficher les stations de la zone</button>
            {userMove && <button className='buttonStyle' onClick={onRecenterClick}>Recentrer sur ma position</button>}
        </div>
    )
}
