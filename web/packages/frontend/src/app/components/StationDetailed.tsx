import { GasStationInfo } from '@web/common/dto';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_BASE_URL, STATION_INFO } from '../const/url.const';

export default function SideMenu() {

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

  useEffect(()=>{
    if(id)
      getStationInfo(id);
    else
      console.error("NO ID FOUND");
  },[id])

  if(gasStationInfo){
    return(
      <div>
          <h1>{gasStationInfo.id}</h1>
          <h2>{gasStationInfo.address}</h2>
    
          {gasStationInfo.prices.map((value) => {
            const priceText = value.gasType+" : "+value.price+"€";
            return (<p key={value.gasType}>{priceText} <br/></p>)})}

          <div>
            <p>Services disponibles</p>
            <ul>
              {gasStationInfo.services.map((service) => {return (<li key={service}>{service}</li>)})}
            </ul>
          </div>

          <div>
            <p>Horaire</p>
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
      </div>
      );
  }
  else{
    return <div></div>
  }
  
}
