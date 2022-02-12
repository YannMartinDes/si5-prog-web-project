import CheckBoxList from './CheckBoxList'

const essencesList = [
  'Gazole',
  'SP95',
  'E85',
  'GPLc',
  'E10',
  'SP98'
]

const serviceList = [
  "Aire de camping-cars",
  "Bar",
  "Bornes électriques",
  "Boutique alimentaire",
  "Boutique non alimentaire",
  "Carburant additivé",
  "DAB (Distributeur automatique de billets)",
  "Douches",
  "Espace bébé",
  "GNV",
  "Lavage automatique",
  "Lavage manuel",
  "Laverie",
  "Location de véhicule",
  "Piste poids lourds",
  "Relais colis",
  "Restauration à emporter",
  "Restauration sur place",
  "Services réparation / entretien",
  "Station de gonflage",
  "Toilettes publiques",
  "Vente d'additifs carburants",
  "Vente de fioul domestique",
  "Vente de gaz domestique (Butane, Propane)",
  "Vente de pétrole lampant",
  "Wifi",
]
export default function FilterBar({ onCheckBoxClick }:
  { onCheckBoxClick: (type: string, value: string, checked: boolean) => void }) {
  const onCheckBoxChangeGaz = (value: string, checked: boolean) => {
    onCheckBoxClick("gaz", value, checked)
  }
  const onCheckBoxChangeService = (value: string, checked: boolean) => {
    console.log("im call")
    onCheckBoxClick("services", value, checked)
  }


  return (
    <div>
      <h1>Filtre</h1>
      <div>
        <h2>Essences</h2>
        <CheckBoxList elementList={essencesList} onCheckBoxChange={onCheckBoxChangeGaz}></CheckBoxList>
      </div>
      <div>
        <h2>Services</h2>
        <CheckBoxList elementList={serviceList} onCheckBoxChange={onCheckBoxChangeService}></CheckBoxList>
      </div>
    </div>

  )
}
