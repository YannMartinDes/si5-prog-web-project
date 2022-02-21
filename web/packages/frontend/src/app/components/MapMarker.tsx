/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { GasStationPosition } from '@web/common/dto';
import { Marker, Tooltip } from 'react-leaflet';
import gasStationIcon from '../../assets/GasStationIcon';
import { FRONT_STATION_ID } from '../const/url.const';
import { useNavigateNoUpdates } from '../context/RouterUtils';


export default function MapMarker({gasStation}
:{gasStation:GasStationPosition}) {
    const navigate = useNavigateNoUpdates();
    const gasStationPos = gasStation.position;

    return (
        <Marker position={[gasStationPos.lat, gasStationPos.lon]} icon={gasStationIcon}
            eventHandlers={{
                click: async () => {
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
