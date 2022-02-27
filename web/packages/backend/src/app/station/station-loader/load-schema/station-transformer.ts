import { isNumberString } from "class-validator";
import { Fuel } from "../../../schemas/fuel.schema";
import { HourSchedule } from "../../../schemas/hourSchedule.schema";
import { Schedule } from "../../../schemas/schedule.schema";
import { Station } from "../../../schemas/station.schema";
import { LoadHoraireDay } from "./load-horaire.class";
import { LoadStation } from "./load-station.class";

export function transformLoadStationToModelStation(loadStation : LoadStation) : Station{
    const result:Station = new Station();
    result.position = loadStation.location
    result._id=loadStation._attributes?.id||""
    result.fuels = transformToArrayIfNotArray(loadStation.prix).map((elt)=>{
        const fuel = new Fuel()
        fuel.name=elt._attributes?.nom
        const price = elt._attributes?.valeur
        if(price && isNumberString(price)){
            fuel.price = +price
        }
        return fuel
    })

    const service = loadStation.services?.service;
    if(service){
        const serviceArray:{_text:string}[] = transformToArrayIfNotArray(service)
        result.services = serviceArray.map((elt)=>elt._text)
    }

    result.address = loadStation.adresse?._text||""
    result.city = loadStation.ville?._text

    const jours = loadStation.horaires?.jour
    if(jours){
        const serviceArray:LoadHoraireDay[] = transformToArrayIfNotArray(jours)

        result.schedules = serviceArray.map((elt:LoadHoraireDay)=>{
            const schedule = new Schedule();
            schedule._id=elt._attributes?.id||"";
            schedule.day=elt._attributes?.nom||"";
            schedule.openned = (elt._attributes?.ferme=="1")?false:true;

            const hourSchedule = new HourSchedule();
            hourSchedule.openHour = elt.horaire?._attributes?.ouverture||'00.00';
            hourSchedule.closedHour = elt.horaire?._attributes?.fermeture||'00.00';

            return schedule
        })
    }
    
    result.automate = (loadStation.horaires?._attributes?.["automate-24-24"]=="1")?true:false
    return result
}

function transformToArrayIfNotArray(elt:any){
    if(!elt){
        return []
    }
    if(!Array.isArray(elt)){
        return [elt]
    }
    return elt;
}

