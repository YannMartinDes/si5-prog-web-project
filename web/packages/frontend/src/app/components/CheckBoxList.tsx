import FilterCheckBox from './CheckBox'
import "./CheckBoxList.scss"

export default function CheckBoxList({elementList, onCheckBoxChange}:{elementList:string[],onCheckBoxChange:(value:string,checked:boolean)=>any}) {
  return (
    <ul className='checkboxList'>
        {elementList.map((elt)=><FilterCheckBox key={elt} value={elt} onCheckBoxClick={onCheckBoxChange}/>)}
    </ul>
  )
}


