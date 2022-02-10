import React from 'react'

export default function FilterCheckBox({type, value, onCheckBoxClick}:
    {type:string,value:string, 
    onCheckBoxClick: (type:string, value:string,checked:boolean)=>void}) {

  return (
    <li>
        <input type={"checkbox"} defaultChecked value={value}
            onChange={(e)=>{
                onCheckBoxClick(type,e.target.value, e.target.checked)
        }}/>
        {value}
    </li>
    
  )
}
