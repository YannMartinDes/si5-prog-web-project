import React from 'react'

export default function FilterCheckBox({value, onCheckBoxClick}:
    {value:string, 
    onCheckBoxClick: (value:string,checked:boolean)=>void}) {

  return (
    <li>
        <input type={"checkbox"} defaultChecked value={value}
            onChange={(e)=>{
                onCheckBoxClick(e.target.value, e.target.checked)
        }}/>
        {value}
    </li>
    
  )
}
