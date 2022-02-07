import { GasStationInfo } from '@web/common/dto';
import React from 'react';

export default function SideMenu({gasStationInfo}:
  {gasStationInfo:GasStationInfo | undefined}) {

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
