// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { Route, Link } from 'react-router-dom';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import GlobalMap from '../components/GlobalMap';

//Extend marker prototype to fix : https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

export function App() {
  return (
    <>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
      <Route
        path="/"
        exact
        render={() => (
          <GlobalMap markersList={[{id:"ID1",position:{lat:46.25000, lon:5.64400}},{id:"ID2",position:{lat:46.25100, lon:5.64500}},{id:"ID3",position:{lat:46.25200, lon:5.64600}}]}/>
        )}
      />
    </>
  );
}

export default App;
