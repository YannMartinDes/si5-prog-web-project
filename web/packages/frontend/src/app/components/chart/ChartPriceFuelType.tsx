import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BACKEND_BASE_URL } from '../../const/url.const';
import axios from 'axios';
import { FuelTypePrice } from '@web/common/dto';
import { FilterStationContext } from '../../context/FilterStationContext';
import { GeolocalisationContext } from '../../context/GeolocalisationContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: `Prix par type d'essence`,
    },
  },
};
const range = 20000

export function ChartPriceFuelType() {

    const [generalFuelPrice, setGeneralFuelPrice] = useState<FuelTypePrice[]>([])
    const {filterState} = useContext(FilterStationContext)
    const {position} = useContext(GeolocalisationContext)

    useEffect(() => {
        axios.get(BACKEND_BASE_URL + "/chart/general-fuels-price",
        { params: 
          { latitude: position.lat, 
            longitude: position.lon, 
            maxDist: range, 
            filter:{
              gas: filterState.gasFilter, 
              services: filterState.servicesFilter,
              schedules: []
            } 
          } 
        }).then((response) => setGeneralFuelPrice(response.data))
        }, [filterState,position])

    const data = useMemo(()=>{
      const labels = generalFuelPrice.map((elt)=>elt.fuelType)
      console.log(generalFuelPrice)
      console.log(generalFuelPrice.map((elt)=>elt.avgPrice))
      return {
        labels:labels,
        datasets: [

          {
            label: 'Prix Min',
            data: generalFuelPrice.map((elt)=>elt.minPrice),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Prix moyen',
            data: generalFuelPrice.map((elt)=>elt.avgPrice),
            backgroundColor: 'rgba(80, 99, 255, 0.5)',
          },
          {
            label: 'Prix Max',
            data: generalFuelPrice.map((elt)=>elt.maxPrice),
            backgroundColor: 'rgba(130, 255, 132, 0.5)',
          },
        ]
      }},[generalFuelPrice]);

  return <Bar options={options} data={data} />
  
}
