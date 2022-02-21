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

      min={0}
      max={500000}
      step={10000}
      onAfterChange={(value) => {
        onSliderChange(value[0]);
      } }
      defaultValue={[20000]} 
      marks={{0:"0KM",250000:"250KM",500000:"500KM"}}
      tipFormatter={value => <span className="tooltip">{(value)/1000}KM</span>}/>
  )
}
