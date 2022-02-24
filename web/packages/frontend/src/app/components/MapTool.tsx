import { Map } from 'leaflet';
import React, { useContext, useEffect, useState } from 'react'
import { GeolocalisationContext } from '../context/GeolocalisationContext'
import { MapContext } from '../context/MapContext';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import StationListElement from './StationListElement';
import { MapContextProvider } from '../context/MapContext';
import { MarkerListContext } from '../context/MarkListContext';
export default function MapTool() {

    const {position}= useContext(GeolocalisationContext);
    const [map,setMap]:[Map, any] = useContext(MapContext);
    const [userMove, setUserMove] = useState(false);
    const [posDraged,setPosDraged,clicked,setClicked] = useContext(MarkerListContext)

    const onDragEnd = ()=>{
        setUserMove(true);
    };
    const updateCenter = () => {
        setPosDraged(map.getCenter())
        console.log(map.getCenter())
    }

    const onRecenterClick = ()=>{
        setUserMove(false);
        map.setView([position.lat, position.lon],13);
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
