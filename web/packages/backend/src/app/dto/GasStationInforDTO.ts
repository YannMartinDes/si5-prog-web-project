import { GasPrice, GasStationInfo, GasStationSchedule, Position } from "@web/common/dto";
import { Station } from "../schemas/station.schema";

export class GasStationInfoDTO implements GasStationInfo{
    position!: Position;
    id!: string;
    services!: string[];
    address!: string;
    prices!: GasPrice[];
    schedules!: GasStationSchedule[];

    static fromStation(station:Station):GasStationInfoDTO{
        const gasPrice:GasPrice[] = station.fuels?.map(elt=>{return {gasType:elt.name,price:elt.price}})||[]
        const schedules:GasStationSchedule[] = station.schedules?.map((elt)=>{return {day:elt.day,openned:elt.openned,hourSchedule:elt.hourSchedule}})||[]
        const position:Position={
            lat:station.position.coordinates[1],
            lon:station.position.coordinates[0]
        }
        return Object.assign(new GasStationInfoDTO(),{
            id:station._id,
            address:station.address,
            services:station.services||[],
            prices:gasPrice,
            schedules:schedules,
            position:position
        });
    }
    
}