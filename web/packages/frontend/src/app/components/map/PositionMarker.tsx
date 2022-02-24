/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {Position} from '@web/common/dto';
import { useContext } from 'react';
import { Marker, Tooltip, useMap } from 'react-leaflet';
import {positionIcon} from '../../../assets/GasStationIcon';
import { useNavigateNoUpdates } from '../../context/RouterUtils';
import { ThemeContext } from '../../context/ThemeContext';


export default function PositionMarker({position}
                                    :{position:Position}) {
  const {isDarkTheme} = useContext(ThemeContext)
  const navigate = useNavigateNoUpdates();
  const map = useMap();

  return (
    <Marker position={[position.lat, position.lon]} icon={positionIcon}>
      <Tooltip>
        VOUS ÊTES ICI
      </Tooltip>
    </Marker>
  );
}
