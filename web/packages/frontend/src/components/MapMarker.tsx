import Position from 'packages/common/dto/src/lib/position';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function MapMarker({popupText,position}
:{popupText:string,position:Position}) {
    return (
        <Marker position={[position.lat, position.lon]}>
            <Popup>
                {popupText}
            </Popup>
        </Marker>
    );
}
