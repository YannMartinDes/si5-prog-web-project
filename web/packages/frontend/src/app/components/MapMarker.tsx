/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { GasStationPosition } from '@web/common/dto';
import { Marker, Tooltip } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import gasStationIcon from '../../assets/GasStationIcon';
import { FRONT_STATION_ID } from '../const/url.const';


export default function MapMarker({gasStation}
:{gasStation:GasStationPosition}) {
    const navigate = useNavigate();
    const gasStationPos = gasStation.position;

    return (
        <Marker position={[gasStationPos.lat, gasStationPos.lon]} icon={gasStationIcon}
            eventHandlers={{
                click: (e) => {
                    navigate(FRONT_STATION_ID+gasStation.id);
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
