import Position from 'packages/common/dto/src/lib/position';
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';

export default function MapMarker({popupText, tooltipText,position}
:{popupText:string,tooltipText?:string,position:Position}) {

    return (
        <Marker position={[position.lat, position.lon]}>
            <Popup>{popupText}</Popup>
            {tooltipText && <Tooltip>{tooltipText}</Tooltip>}
        </Marker>
    );
}
