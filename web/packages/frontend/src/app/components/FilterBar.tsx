import { useEffect, useState } from 'react'
import CheckBoxList from './CheckBoxList'
import axios from 'axios';
import { BACKEND_BASE_URL } from '../const/url.const';

export default function FilterBar({ onCheckBoxClick }:
  { onCheckBoxClick: (type: string, value: string, checked: boolean) => void }) {
  const [serviceList,setServiceList]=useState([])
  const [fuelList,setFuelList]=useState([])

  useEffect(()=>{
    axios.get(BACKEND_BASE_URL+"/station/service-type").then((response)=>setServiceList(response.data))
    axios.get(BACKEND_BASE_URL+"/station/fuel-type").then((response)=>setFuelList(response.data))
  },[])

  const onCheckBoxChangeGaz = (value: string, checked: boolean) => {
    onCheckBoxClick("gas", value, checked)
  }
  const onCheckBoxChangeService = (value: string, checked: boolean) => {
    onCheckBoxClick("services", value, checked)
  }


  return (
    <div>
      <h1>Filtre</h1>
      <div>
        <h2>Essences</h2>
        <CheckBoxList elementList={fuelList} onCheckBoxChange={onCheckBoxChangeGaz}></CheckBoxList>
      </div>
      <div>
        <h2>Services</h2>
        <CheckBoxList elementList={serviceList} onCheckBoxChange={onCheckBoxChangeService}></CheckBoxList>
      </div>
    </div>

  )
}
