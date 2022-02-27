import { GasPrice, Position } from ".";
import { GasStationSchedule } from "./gas-station-schedule";

export interface GasStationInfo {
    id: string;
    services: string[];
    address:string;
    prices:GasPrice[];
    schedules:GasStationSchedule[];
    position:Position

  }