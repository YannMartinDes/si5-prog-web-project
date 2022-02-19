import { useContext, useEffect, useState } from 'react'
import CheckBoxList from './CheckBoxList'
import axios from 'axios';
import Select from 'react-select';
import { BACKEND_BASE_URL } from '../const/url.const';
import { ADD_GAS_FILTER, ADD_SERVICE_FILTER, FilterStationContext, REMOVE_GAS_FILTER, REMOVE_SERVICE_FILTER } from '../context/FilterStationContext';
import { MenuList, OptionMenuList } from './MenuList';
import Button from 'react-bootstrap/esm/Button';


export default function FilterBar() {
  const {dispatch} = useContext(FilterStationContext)
  const [serviceList,setServiceList]=useState([])
  const [fuelList,setFuelList]=useState([])
  const [cityList,setCityList]=useState([])
  const [hide,setHide] = useState(true);

  useEffect(()=>{
    axios.get(BACKEND_BASE_URL+"/station/service-type").then((response)=>setServiceList(response.data))
    axios.get(BACKEND_BASE_URL+"/station/fuel-type").then((response)=>setFuelList(response.data))
    axios.get(BACKEND_BASE_URL+"/station/city").then((response)=>setCityList(response.data))

  },[])

  const onCheckBoxChangeGaz = (value: string, checked: boolean) => {
    if(checked){
      dispatch({type:ADD_GAS_FILTER,payload:value});
    }
    else{
      dispatch({type:REMOVE_GAS_FILTER,payload:value});
    }
  }
  const onCheckBoxChangeService = (value: string, checked: boolean) => {
    if(checked){
      dispatch({type:ADD_SERVICE_FILTER,payload:value});
    }
    else{
      dispatch({type:REMOVE_SERVICE_FILTER,payload:value});
    }  
  }

  const onCityChange = (citySelected:any)=>{
    console.log(citySelected)
  }

  const onHideShowClick = () => {
    setHide(!hide);
  }

  const test :any = MenuList

  if(hide){
    return (
      <div className='filterBar'>
        <Button onClick={(e)=> onHideShowClick()}>Show</Button>
      </div>
    )
  }
  else{
    return (
      <div className='filterBar'>
        <h2>Filtre</h2>
        <div className='subFilter'>
          <h3>Ville</h3>
          <Select components={{MenuList:test,Option:OptionMenuList}} options={cityList.map((elt)=>{return {label:elt,value:elt}})} onChange={onCityChange} ></Select>
        </div>
        <div className='subFilter'>
          <h3>Essences</h3>
          <CheckBoxList elementList={fuelList} onCheckBoxChange={onCheckBoxChangeGaz}></CheckBoxList>
        </div>
        <div className='subFilter'>
          <h3>Services</h3>
          <CheckBoxList elementList={serviceList} onCheckBoxChange={onCheckBoxChangeService}></CheckBoxList>
        </div>
        <button onClick={(e)=> onHideShowClick()}>Hide</button>
      </div>
    )
  }
}
