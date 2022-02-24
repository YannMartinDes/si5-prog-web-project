import React from 'react'

export default function CheckBox({value, onCheckBoxClick}:
  {value:string, onCheckBoxClick: (value:string,checked:boolean)=>void}) {

  return (
    <li>
        <input type={"checkbox"} value={value}
            onChange={(e)=>{
                onCheckBoxClick(value, e.target.checked)
        }}/>
        {value}
    </li>
    
  )
}
