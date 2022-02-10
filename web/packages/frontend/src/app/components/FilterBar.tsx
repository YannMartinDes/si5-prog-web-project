import React from 'react'
import FilterCheckBox from './FilterCheckBox'

export default function FilterBar({onCheckBoxClick}:
    {onCheckBoxClick: (type:string, value:string,checked:boolean)=>void}) {
  return (
    <div>
        <h1>Filtre</h1>
        <div>
            <h2>Essences</h2>
            <ul>
                <FilterCheckBox type='gas' value='Gazole' onCheckBoxClick={onCheckBoxClick}/>
                <FilterCheckBox type='gas' value='SP95' onCheckBoxClick={onCheckBoxClick}/>
                <FilterCheckBox type='gas' value='E85' onCheckBoxClick={onCheckBoxClick}/>
                <FilterCheckBox type='gas' value='GPLc' onCheckBoxClick={onCheckBoxClick}/>
                <FilterCheckBox type='gas' value='E10' onCheckBoxClick={onCheckBoxClick}/>
                <FilterCheckBox type='gas' value='SP98' onCheckBoxClick={onCheckBoxClick}/>
            </ul>
        </div>
        

    </div>
  )
}
