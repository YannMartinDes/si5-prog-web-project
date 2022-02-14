import React from 'react'

export default function CustomerPosition({onButtonClick}:
                                   {onButtonClick: (long: number, lat: number)=>void}) {

  let long  = 2;
  let lat  =  2;

  return (
    <li>
      <button onChange={(e)=>{
               onButtonClick(long, lat) }}/>

      Showing Position : {long} : {lat}
    </li>
  )
}
