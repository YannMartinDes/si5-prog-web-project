import { GasStationInfo } from '@web/common/dto';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_BASE_URL, STATION_INFO } from '../const/url.const';

export default function SideMenu() {
  const navigate = useNavigate();
  const [gasStationInfo,setGasStationInfo] = useState<GasStationInfo>();
  const {id} = useParams();

  function getStationInfo(stationId:string) {
    console.log("CALL BACKEND FOR STATION INFO "+stationId)

    axios.get(BACKEND_BASE_URL+STATION_INFO+"/"+stationId)
       .then(res => {
          //console.log("Receive response "+JSON.stringify(res))
          setGasStationInfo(res.data);
       });
  }

  function onBackClick(){
    navigate("/");
  }

  useEffect(()=>{
    if(id)
      getStationInfo(id);
    else
      console.error("NO ID FOUND");
  },[id])

  if(gasStationInfo){
    return(
      <div className='stationDetailed'>
          <h1>{gasStationInfo.address}</h1>
          <h3>{gasStationInfo.id}</h3>
    
          <div className='subInfo'>
            <h2>Essences</h2>
            {gasStationInfo.prices.map((value) => {
            const priceText = value.gasType+" : "+value.price+"€";
            return (<p key={value.gasType}>{priceText} <br/></p>)})}
          </div>
        
          <div className='subInfo'>
            <h2>Services disponibles</h2>
            <ul>
              {gasStationInfo.services.map((service) => {return (<li key={service}>{service}</li>)})}
            </ul>
          </div>

          <div className='subInfo'>
            <h2>Horaire</h2>
            <ul>
              {gasStationInfo.schedules.map((schedule) => {
                const scheduleText = schedule.day + (schedule.openned? " ouvert ":" fermé ");

                return (<li key={schedule.day}>
                    <p>{scheduleText}</p>
                    {schedule.hourSchedule && schedule.hourSchedule.map((hour)=>{
                      return (<p key={hour.openHour}>de {hour.openHour} à {hour.closedHour}</p>);
                    })}
                  </li>)})}
            </ul>
          </div>
          <button className='buttonStyle' onClick={(e)=>{onBackClick()}} >Go back to stations list</button>
      </div>
      );
  }
  else{
    return (
    <div>
      <button className='buttonStyle' onClick={(e)=>{onBackClick()}} >Go back to stations list</button>
    </div>
    );
  }
  
}
