import "./StationList.scss"
import { GasStationPosition } from '@web/common/dto'
import React, { useContext, useEffect, useState } from 'react'
import StationListElement from './StationListElement'
import { TailSpin } from "react-loader-spinner"
import { stat } from "fs"
import { MenuList , OptionMenuList} from "../MenuList"
import axios from "axios"
import { BACKEND_BASE_URL } from "../../const/url.const"
import {GasStationPositionContext} from "../../context/GasStationPositionContext"
export default function StationList() {
    
  const [isAscending, setIsAscending] = useState(true);
  const [isPriceAscending, setIsPriceAscending] = useState(true);
  const [fuelList, setFuelList] = useState([])
  const [stationList,setStationList] = useContext(GasStationPositionContext)
  const sortAddressAscending = (a:GasStationPosition,b:GasStationPosition)=>{
    if(a.address < b.address) return -1;
    if(a.address > b.address) return 1;
    return 0; 
  }

  const sortAddressDescending = (a:GasStationPosition,b:GasStationPosition)=>{
    if(a.address > b.address) return -1;
    if(a.address < b.address) return 1;
    return 0; 
  }
  
  const sortPriceAscending = (typeStation :string,a:GasStationPosition,b:GasStationPosition)=>{
    let undefined = 0
    let firstCheck= false
    let secondCheck = false
    for (let gasTypeFirstElem of a.prices){
      if (gasTypeFirstElem.gasType==typeStation){
        for (let gasTypeElem of b.prices){
          if (gasTypeElem.gasType==typeStation){
            undefined =gasTypeElem.price - gasTypeFirstElem.price
            return undefined}
          }
          firstCheck = true
      }
      secondCheck = true
    }
    if (firstCheck && secondCheck){
      return -100000
    }
    if (firstCheck) {
      return 100000
    }
    else {
      return 100000
    }
  }

 
  const sortPriceUp = (a:GasStationPosition,b:GasStationPosition)=>{
    let selectedGas: string = (document.getElementById("monselect") as HTMLInputElement).value;
    return sortPriceAscending(test,a,b)
  }
  const sortListClickByAdress = ()=>{
    let sortMethod = null;
    stationList.sort((a: GasStationPosition,b: GasStationPosition)=> {
      isAscending? sortMethod = sortAddressAscending: sortMethod = sortAddressDescending
      return sortMethod(a,b);
    })
    setIsAscending(!isAscending);
  }

  const sortListClickByPrice = ()=>{
    let stationsWithSelectedGasType=[]
    let stationsWithoutGasType=[]
    console.log(stationList)
    let selectedGas: string = (document.getElementById("monselect") as HTMLInputElement).value;
    for (let e of stationList){
      let exist = false
      for (let gas of e.prices){
        if(gas.gasType==test){
          stationsWithSelectedGasType.push(e)
          console.log(gas.gasType==test)
          exist = true
          break
        }
      }
      if(!exist){
        stationsWithoutGasType.push(e)
      }
    }
    stationsWithSelectedGasType.sort(sortPriceUp)
    console.log(stationsWithSelectedGasType.length)
    setStationList([...stationsWithSelectedGasType,...stationsWithoutGasType])

}
  const test: any = MenuList
  
  useEffect(() => {
    axios.get(BACKEND_BASE_URL + "/station/fuel-type").then((response) => setFuelList(response.data))
    console.log(fuelList)
  }, [])

  return (
    <div className='stationList'>
      <h1>Stations Essences :</h1>
      {(stationList?.length) !== 0 ?
        (<div>
          <button className="buttonStyle" onClick={sortListClickByAdress}>Trier A-Z</button>
          <button className="buttonStyle" onClick={sortListClickByPrice}>Trier par prix et type d'essence </button>
          <select id="monselect"> 
          {fuelList.map((elt) => { return  <option value={elt}>{elt}</option> })}
          </select> 
          {stationList?.map((station: GasStationPosition)=>{
            return <StationListElement key={station.id} gasStation={station}/>
          })}
        </div>)
      :(
        <div>
          <h2>Chargement...</h2>
          <TailSpin color="#063d44" width={60} height={60}/>  
        </div>)}
    </div>
  )
}


