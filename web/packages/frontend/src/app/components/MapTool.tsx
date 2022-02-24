import { Map } from 'leaflet';
import React, { useContext, useEffect, useState } from 'react'
import { GeolocalisationContext } from '../context/GeolocalisationContext'
import { MapContext } from '../context/MapContext';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import StationListElement from './StationListElement';
import { MapContextProvider } from '../context/MapContext';
import { MarkerListContext } from '../context/MarkListContext';
export default function MapTool() {

    const [position,setPosition]= useContext(GeolocalisationContext);
    const [map,setMap]:[Map, any] = useContext(MapContext);
    const [userMove, setUserMove] = useState(false);
    const [posDraged,setPosDraged,clicked,setClicked] = useContext(MarkerListContext)

    const onDragEnd = ()=>{
        setUserMove(true);
    };
    const updateCenter = () => {
        const posUpdate=map.getCenter()
        setPosition({lat:posUpdate.lat,lon:posUpdate.lng})
    }

    const onRecenterClick = ()=>{
        setUserMove(false);
        Promise.resolve(navigator.geolocation.getCurrentPosition((position) => {
            const pos = {lat: position.coords.latitude, lon: position.coords.longitude};
            setPosition(pos)
            map.setView([pos.lat, pos.lon],13);
        },(error)=>{console.log(error)}))

    }
    const clickButton = ()=>{
        updateCenter()
        setClicked(true);
    }


    useEffect(()=>{//map est null à l'instanciation
        if(map) {
            map.on("dragend",onDragEnd);
           
        }
    },[map])

    return (
        <div>
            {userMove && <button className='buttonStyle' onClick={onRecenterClick}>Recentrer sur ma position</button>}
            <div className='positionLegend'>
                Position : {position.lat} , {position.lon}
            </div>
            {userMove && <button className='buttonStyle' onClick={clickButton}>Recupere les stations proche de ma position</button>}
        </div>
    )
}
