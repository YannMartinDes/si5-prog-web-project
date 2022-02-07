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

import useSwr from "swr";

const fetcher = (...args:any) => fetch(args).then(response => response.json());

function App() {
  const url =
    "http://localhost:3333/api/get-near-station/7.289429/43.675819/10000"
  const { data, error } = useSwr(url, { fetcher });
  const crimes = data && !error ? data : [];
  const myMarkerList: any[]=[]
  for( let jsonData of crimes){
    let parsedJsonData:any ={}
    let stringPrice=""
    for (let priceData of jsonData["prix"]){
      stringPrice=priceData["_attributes"]["nom"]+" : "+(priceData["_attributes"]["valeur"])+" € "
    }
    parsedJsonData["prix"]=stringPrice
    parsedJsonData["position"]={lat:jsonData["coordinates"][1],lon:jsonData["coordinates"][0]}
    myMarkerList.push(parsedJsonData)
  }
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
          <GlobalMap markersList={myMarkerList}/>
        )}
      />
    </>
  );
}

export default App;
