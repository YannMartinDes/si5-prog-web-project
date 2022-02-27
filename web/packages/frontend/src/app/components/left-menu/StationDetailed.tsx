import "./StationDetailed.scss"
import { GasStationInfo, UserIssue } from '@web/common/dto';
import {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {BACKEND_BASE_URL, REPORT_ISSUE, STATION_INFO, UPDATE_FAVORITE_STATION_URL} from '../../const/url.const';
import {TailSpin} from 'react-loader-spinner'
import { useNavigateNoUpdates } from "../../context/RouterUtils";
import {AuthContext} from "../../context/AuthContext";
import { MapContext} from "../../context/MapContext";
import L from "leaflet";
import { Map } from 'leaflet';
import 'leaflet-routing-machine';
import { GeolocalisationContext } from "../../context/GeolocalisationContext";

export default function SideMenu() {
  const navigate = useNavigateNoUpdates()
  const [gasStationInfo,setGasStationInfo] = useState<GasStationInfo>();
  const {id} = useParams();
  const { user, favoriteStations, setFavoriteStations} = useContext(AuthContext)
  const {map,navControl,setNavControl}:{map:Map,navControl:any,setNavControl:any} = useContext(MapContext);
  const {userPosition,searchPosition,setSearchPosition} = useContext(GeolocalisationContext)

  function getStationInfo(stationId:string) {
    console.log("GET STATION INFO FOR "+stationId)

    axios.get(BACKEND_BASE_URL+STATION_INFO+"/"+stationId)
       .then(res => {
          setGasStationInfo(res.data);
       });
  }
  function reportStationIssue(stationId:string,reportMSG:string){
    console.log("REPORT ISSUE FOR STATION "+stationId)
    const message:UserIssue = {stationId:stationId, userMsg:reportMSG}

    axios.post(BACKEND_BASE_URL+REPORT_ISSUE,{issue:message})
       .then(res => {
        window.alert("Votre problème a bien été envoyé")
      }).catch((error)=>{
        window.alert("Impossible d'envoyer votre problème, Veuillez réessayer")
      });
  }

  function onBackClick(){
    navigate("/");
  }

  function onUserReportClick(id : string){
    const msg = prompt("Quel est votre problème ?");
    if(msg){
      reportStationIssue(id,msg)
    }
  }
  function onItineraireClick(){
    addNavigation()
  }


  const addNavigation = () =>{
    if(navControl){
      map.removeControl(navControl)
    }
    setNavControl(L.Routing.control({
      routeWhileDragging: true,   
      collapsible:true,
      waypoints: [
          L.latLng(userPosition.lat, userPosition.lon),
          L.latLng(gasStationInfo?.position.lat||0,gasStationInfo?.position.lon||0)
      ]
    }).addTo(map)
    )
    
  }
  useEffect(()=>{
    if(id)
      getStationInfo(id);
    else
      console.error("NO ID FOUND");
  },[id])

 
  function removeFavoriteStation(){
    if(user!=''){      
      let newFavoriteStations:string[] = [];
      newFavoriteStations = favoriteStations.filter((elt:string)=> elt !== gasStationInfo?.id);

      setFavoriteStations(newFavoriteStations);
      setNewFavorite().then((res)=> console.log('Favorites updated for current user !'));
    } else{
      window.alert("Vous devez être connecté pour utiliser les stations favorites")
      navigate("/login");
    }
  }

  function addFavoriteStation(){
    if(user!=''){      
      const newFavoriteStations:string[] = favoriteStations;
      newFavoriteStations.push(gasStationInfo!.id);

      setFavoriteStations(newFavoriteStations);
      setNewFavorite().then((res)=> console.log('Favorites updated for current user !'));
    } else{
      window.alert("Vous devez être connecté pour utiliser les stations favorites")
      navigate("/login");
    }
  }

  async function setNewFavorite(){
    if(user!=''){
      console.log("CALL BACKEND FOR SET FAVORITE STATION OF ", user);
      try {
        //TODO acios request
        // const favorite = await axios.post(BACKEND_BASE_URL + UPDATE_FAVORITE_STATION_URL,
        //   {headers: {Authorization: 'Bearer ', token}, body:{favoriteStations}});
      } catch (e){
        console.log(e);
      }
    }
  }

  const favoriteButton = ()=>{
    if(gasStationInfo && favoriteStations.includes(gasStationInfo.id)){
      return (<button className='buttonStyle' onClick={(e)=>{removeFavoriteStation()}}>Retirer la station des favoris</button>)
    }
    else{
      return (<button className='buttonStyle' onClick={(e)=>{addFavoriteStation()}}>Ajouter la station aux favoris</button>)
    }
  }

  return(
    <div className='stationDetailed'>
        <h1>{gasStationInfo?.address||"chargement..."}</h1>
        <h3>{gasStationInfo?.id||"chargement..."}</h3>

        <div className='subInfo'>
          <h2>Essences</h2>
          {gasStationInfo? gasStationInfo.prices.map((value) => {
            const priceText = value.gasType+" : "+value.price+"€";
            return (<p key={value.gasType}>{priceText}</p>)
          }):
          <TailSpin color="#063d44" width={60} height={60}/>}
        </div>

        <div className='subInfo'>
          <h2>Services disponibles</h2>
          <ul>
            {gasStationInfo? gasStationInfo.services.map((service) => {return (<li key={service}>{service}</li>)})
            :<TailSpin color="#063d44" width={60} height={60}/>}
          </ul>
        </div>

        <div className='subInfo'>
          <h2>Horaire</h2>

            {gasStationInfo?
              ((gasStationInfo.schedules.length !== 0) ?
                (<ul>
                  {gasStationInfo.schedules.map((schedule) => {
                    const scheduleText = schedule.day + (schedule.openned? " ouvert ":" fermé ");
                    return (
                      <li key={schedule.day}>
                        <p>{scheduleText}</p>
                        {schedule.hourSchedule && schedule.hourSchedule.map((hour)=>{
                          return (<p key={hour.openHour}>de {hour.openHour} à {hour.closedHour}</p>);
                        })}
                      </li>)}
                  )}
                </ul>)
                : (<p>Pas d'informations disponibles</p>))
            :<TailSpin color="#063d44" width={60} height={60}/>}
        </div>
        {favoriteButton()}
        <button className='buttonStyle' onClick={(e)=>{onBackClick()}} >{"<< Liste des stations"}</button>
        <button className='buttonStyleRed' onClick={(e)=>{onUserReportClick(gasStationInfo?.id!)}} >Signaler un problème</button>
        <button className='buttonStyle' onClick={(e)=>{onItineraireClick()}} >Calculer un itineraire</button>
    </div>
    );
}
