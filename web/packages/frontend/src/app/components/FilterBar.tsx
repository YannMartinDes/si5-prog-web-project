import "./FilterBar.scss"
import { useContext, useEffect, useState } from 'react'
import CheckBoxList from './CheckBoxList'
import axios from 'axios';
import Select from 'react-select';
import { BACKEND_BASE_URL } from '../const/url.const';
import { ADD_GAS_FILTER, SET_SERVICE_FILTER, FilterStationContext, REMOVE_GAS_FILTER, UPDATE_RANGE_FILTER } from '../context/FilterStationContext';
import { MenuList, OptionMenuList } from './MenuList';
import Button from 'react-bootstrap/esm/Button';
import SliderReact from "./Slider";
import {useNavigateNoUpdates} from "../context/RouterUtils";


export default function FilterBar() {

  const navigate = useNavigateNoUpdates();
  const [serviceList, setServiceList] = useState([])
  const [fuelList, setFuelList] = useState([])
  const [cityList, setCityList] = useState([])
  const [value,setValue] = useState<number>(2000)
  const { dispatch } = useContext(FilterStationContext)
  const [filteredServices, setFilteredServices] = useState<{label:string,value:string}[]>([]);
  const [hideBar, setHideBar] = useState(true);

  useEffect(() => {
    axios.get(BACKEND_BASE_URL + "/station/service-type").then((response) => setServiceList(response.data))
    axios.get(BACKEND_BASE_URL + "/station/fuel-type").then((response) => setFuelList(response.data))
    axios.get(BACKEND_BASE_URL + "/station/city").then((response) => setCityList(response.data))

  }, [])

  const onCheckBoxChangeGaz = (value: string, checked: boolean) => {
    if (checked) {
      dispatch({ type: ADD_GAS_FILTER, payload: value });
    }
    else {
      dispatch({ type: REMOVE_GAS_FILTER, payload: value });
    }
  }
  const onServiceFilterChange = (value:any)=>{
    setFilteredServices(value);
    const serviceFiltered:string[] = [];
    value.map((elt:{label:string, value:string})=>{
      serviceFiltered.push(elt.value);
    })
    dispatch({ type: SET_SERVICE_FILTER, payload: serviceFiltered });
  }
  const onRangeFilterChange = (value:any)=>{
    setValue(value);
    const rangeFiltred :number = value;
    dispatch({ type: UPDATE_RANGE_FILTER, payload: rangeFiltred });
  }

  const onCityChange = (citySelected: any) => {
    console.log(citySelected)
    //TODO
  }

  const onHideShowClick = () => {
    setHideBar(!hideBar);
  }

  const test: any = MenuList
  const filterBarContainer = (
    <div className="filter-bar-container">
      <h2>Filtre</h2>
      <div className='subFilter'>
        <h3>Ville</h3>
        <Select className="select" components={{ MenuList: test, Option: OptionMenuList }} options={cityList.map((elt) => { return { label: elt, value: elt } })} onChange={onCityChange} ></Select>
      </div>
      <div className='subFilter'>
        <h3>Essences</h3>
        <CheckBoxList elementList={fuelList} onCheckBoxChange={onCheckBoxChangeGaz}></CheckBoxList>
      </div>
      <div className='subFilter'>
        <h3>Services</h3>
        <Select className="select" isMulti options={serviceList.map((elt) => { return { label: elt, value: elt } })} onChange={onServiceFilterChange}
          value = {filteredServices}></Select>
      </div>
      <div className="subFilter slider">
      <h3>Rayon</h3>
        <SliderReact value={value} onSliderChange={onRangeFilterChange} ></SliderReact>
      </div>
      <button className="buttonStyle" onClick={(e) => onHideShowClick()}>Hide</button>
    </div>
  )


  return (
    <div className='filterBar'>
      {hideBar? <button className="buttonStyle" onClick={(e) => onHideShowClick()}>Show</button> : filterBarContainer}
      <button className="loginButton buttonStyle" onClick={(e) => navigate(`login`)}>Profil Utilisateur</button>
    </div>
  )
}
