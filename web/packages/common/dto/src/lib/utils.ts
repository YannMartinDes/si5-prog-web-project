import { Station } from '../../../../backend/src/app/schemas/station.schema';
import { Position } from '../../../../common/dto/src/lib/position'
import { Filter } from './filter';
import { GasPrice } from './gas-price';
import { GasStationHourSchedule } from './gas-station-hour-schedule';
import { GasStationSchedule } from './gas-station-schedule';

export const stringServicesArray :string[] = [
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
    "Wifi"]

export const stringEssenceArray :string[] =   ["Gazole",
        "SP95",
        "E85",
        "GPLc",
        "E10",
        "SP98"]
export function getAdresseText(station: Station){
    if (station?.adresse?._text){
        return station.adresse._text 
    }
    else {
        return "undefined"
    }
}

export function getCoordinates(station: Station){
    let pos:Position={lat:0,lon:0}
    if (station?.coordinates){
        let latLongArray:number[]=station.coordinates
        pos.lon=latLongArray[0]
        pos.lat=latLongArray[1]

      }
      return pos
}

export function getID(station: Station){
if (station?._attributes?.id){
    return station._attributes.id
  }
    else {
        return "undefined"
    }
}

export function getGasPrices(station: Station):GasPrice[]{
    let gasInfoArray :GasPrice[] = []
    if (station?.prix){
    for (const gasInfo of station.prix){
        if (gasInfo?._attributes){
        gasInfoArray.push({gasType:gasInfo._attributes.nom,price:gasInfo._attributes.valeur})
            }
        }
    }
    return gasInfoArray
}

export function getGasServicesArray(station: Station):string[]{
let gasServicesArray : string []= []
if (station?.services?.service){
  if (station?.services?.service.length>0){
    for (const serviceInfo of station.services.service){
        if (serviceInfo._text){
            gasServicesArray.push(serviceInfo._text)
                    }
                }
            }
        }
    return gasServicesArray
    }

export function getGasStationHourSchedule(scheduleInfo: any):GasStationHourSchedule[]{    
    let gasHourInfo:GasStationHourSchedule[]= []
    if (scheduleInfo?.horaire?._attributes){
    let openString :string = (+scheduleInfo.horaire._attributes.ouverture.split(".")[0])+"h"+scheduleInfo.horaire._attributes.ouverture.split(".")[1]
    let closeString :string = (+scheduleInfo.horaire._attributes.fermeture.split(".")[0])+"h"+scheduleInfo.horaire._attributes.fermeture.split(".")[1]
    gasHourInfo.push({
      openHour:openString,
      closedHour:closeString
        })
    }
  return gasHourInfo
}
export function getClosed(scheduleInfo: { _attributes: any; horaire?: { _attributes: { ouverture: string; fermeture: string; }; }; } ){
    let closed : boolean
    if (scheduleInfo?._attributes.ferme==''){
    closed=true
    }
    else {
    closed =false
    }
    return closed
}

export function getGasStationSchedule(station: Station):GasStationSchedule[]{
    let schedules: GasStationSchedule[] = []
    if (station?.horaires?.jour){

        for (const scheduleInfo of station?.horaires?.jour){
        let gasHourInfo:GasStationHourSchedule[]= getGasStationHourSchedule(scheduleInfo)
        let closed : boolean= getClosed(scheduleInfo)
        
        if(scheduleInfo?._attributes){
        schedules.push({day:scheduleInfo._attributes.nom,openned:closed,
        hourSchedule:gasHourInfo})
        }
        else {
        schedules.push({day:"NoNameFund",openned:closed,
        hourSchedule:gasHourInfo})
            }
        }
    }
    return schedules
}

export function createQueryNearWithFilter(longitudeCurrent:number,latitudeCurrent:number,maxDist:number,filter:Filter){
    //console.log("\n\n\n"+JSON.stringify(filter)+"\n\n\n end of filter")
    filter=JSON.parse(""+filter)
    let listOrGas = []
    let listOrService = []
    if (filter.gas.length == 0){
      filter.gas=stringEssenceArray
    }

    if (filter.services.length == 0){
      filter.services= stringServicesArray
    }

    for (const gasType of filter.gas){

      listOrGas.push({ prix : { $elemMatch : { "_attributes.nom": gasType }} } )}

    for (const gasService of filter.services){

      listOrService.push({ "services.service" : { $elemMatch : { "_text": gasService }} } )}

    let query ={coordinates:{ $nearSphere: { $geometry: { type: "Point", coordinates: [ longitudeCurrent, latitudeCurrent ] }, $maxDistance: maxDist }},
    "$and":[{"$or":listOrGas},{"$or":listOrService}]}
    return query
}