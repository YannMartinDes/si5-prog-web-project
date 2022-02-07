/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { GasStationPosition } from '@web/common/dto';
import { Marker, Tooltip } from 'react-leaflet';
import gasStationIcon from '../../assets/GasStationIcon';


export default function MapMarker({gasStation, onMarkerClick}
:{gasStation:GasStationPosition,
onMarkerClick:(Id:string)=>void}) {

    const gasStationPos = gasStation.position;

    return (
        <Marker position={[gasStationPos.lat, gasStationPos.lon]} icon={gasStationIcon}
            eventHandlers={{
                click: (e) => {
                    onMarkerClick(gasStation.id);
                },
            }}
          >
            <Tooltip>
                {gasStation.id} <br/>
                {gasStation.address}<br/>
                {gasStation.prices.map((value) => {
                    const priceText = value.gasType+" : "+value.price+"€";
                    return (<p key={value.gasType}>{priceText} <br/></p>)
                })}

            </Tooltip>
        </Marker>
    );
}
