import { ChartPriceFuelType } from '../chart/ChartPriceFuelType';
import StationPriceOrder from '../chart/StationPriceOrder';
import './Chart.scss'

export default function ChartPage() {


  return (
    <div className='chart-wrapper'>
      <ChartPriceFuelType />
      <StationPriceOrder/>
    </div>
  )
}
