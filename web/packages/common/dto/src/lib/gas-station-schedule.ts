import { GasStationHourSchedule } from "./gas-station-hour-schedule";

export interface GasStationSchedule{
    day:string,
    openned:boolean,
    hourSchedule?:GasStationHourSchedule[];
}