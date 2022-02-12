import React from 'react'
import FilterCheckBox from './CheckBox'
import CheckBoxList from './CheckBoxList'

const EssencesList=[
  'Gazole',
  'SP95' ,
  'E85' ,
  'GPLc' ,
  'E10' ,
  'SP98' 
]
export default function FilterBar({onCheckBoxClick}:
    {onCheckBoxClick: (type:string, value:string,checked:boolean)=>void}) {
  const onCheckBoxChangeGaz = (value:string,checked:boolean)=>{
    onCheckBoxClick("gaz",value,checked)
  }
  
  return (
    <div>
        <h1>Filtre</h1>
        <div>
            <h2>Essences</h2>
            <CheckBoxList elementList={EssencesList} onCheckBoxChange={onCheckBoxChangeGaz}></CheckBoxList>
        </div>
        

    </div>
  )
}



export function FilterList() {
  return (
    <div>FilterList</div>
  )
}
