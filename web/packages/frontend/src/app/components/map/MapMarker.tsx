/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { GasStationPosition } from '@web/common/dto';
import { useContext } from 'react';
import { Marker, Tooltip, useMap } from 'react-leaflet';
import {gasStationIcon,gasStationIconDark} from '../../../assets/GasStationIcon';
import { FRONT_STATION_ID } from '../../const/url.const';
import { GeolocalisationContext } from '../../context/GeolocalisationContext';
import { useNavigateNoUpdates } from '../../context/RouterUtils';
import { ThemeContext } from '../../context/ThemeContext';


export default function MapMarker({gasStation}
:{gasStation:GasStationPosition}) {
    const {isDarkTheme} = useContext(ThemeContext)
    const navigate = useNavigateNoUpdates();
    const gasStationPos = gasStation.position;
    const map = useMap();
    const {userPosition,searchPosition,setSearchPosition} = useContext(GeolocalisationContext)
    return (
        <Marker position={[gasStationPos.lat, gasStationPos.lon]} icon={gasStationIcon?gasStationIcon:gasStationIconDark}
            eventHandlers={{
                click: async () => {
                    setSearchPosition({lat:gasStationPos.lat, lon: gasStationPos.lon})
                    map.setView([gasStationPos.lat, gasStationPos.lon],17, {animate:true})
                    await navigate(FRONT_STATION_ID+gasStation.id);
                },
            }}
          >
            <Tooltip>
                {gasStation.id} <br/>
                {gasStation.address}<br/>
                {gasStation.prices.map((value) => {
                    const priceText = value.gasType+" : "+value.price+"€";
                    return (<div key={value.gasType}>{priceText}</div>)
                })}

            </Tooltip>
        </Marker>
    );
}
