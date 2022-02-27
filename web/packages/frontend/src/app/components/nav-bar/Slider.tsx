import React from 'react';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export default function SliderReact({value, onSliderChange}:
  {value:number, onSliderChange: (value:number)=>void}) {
    
  return (
      <Range
      min={1000}
      max={300000}
      step={5000}
      onAfterChange={(value) => {
        onSliderChange(value[0]);
      } }
      defaultValue={[value]} 
      marks={{1000:"1KM",150000:"150KM",300000:"300KM"}}
      tipFormatter={value => (value/1000)+"KM"}
      />
  )
}
