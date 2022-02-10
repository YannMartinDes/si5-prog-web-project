import React from 'react'
import FilterCheckBox from './FilterCheckBox'

export default function FilterBar({onCheckBoxClick}:
    {onCheckBoxClick: (value:string,checked:boolean)=>void}) {
  return (
    <div>
        <h1>Filtre</h1>
        <div>
            <h2>Essences</h2>
            <ul>
                <FilterCheckBox value='Gazole' onCheckBoxClick={onCheckBoxClick}/>
                <FilterCheckBox value='SP95' onCheckBoxClick={onCheckBoxClick}/>
                <FilterCheckBox value='E85' onCheckBoxClick={onCheckBoxClick}/>
                <FilterCheckBox value='GPLc' onCheckBoxClick={onCheckBoxClick}/>
                <FilterCheckBox value='E10' onCheckBoxClick={onCheckBoxClick}/>
                <FilterCheckBox value='SP98' onCheckBoxClick={onCheckBoxClick}/>
            </ul>
        </div>
        

    </div>
  )
}
