/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { GasStationPosition } from '@web/common/dto';
import { Marker, Tooltip } from 'react-leaflet';
import gasStationIcon from '../../assets/GasStationIcon';


export default function MapMarker({gasStation}
:{gasStation:GasStationPosition}) {

    const gasStationPos = gasStation.position;

    function createTooltipText(gasStation:GasStationPosition){
        let tooltipText = ""+gasStation.id+"\n";
        tooltipText += gasStation.address+"\n";

        gasStation.prices.map((value,index) => {tooltipText += value.gasType+" : "+value.price+"\n"});

        return tooltipText;
    }

    return (
        <Marker position={[gasStationPos.lat, gasStationPos.lon]} icon={gasStationIcon}>
            <Tooltip>{createTooltipText(gasStation)}</Tooltip>
        </Marker>
    );
}
