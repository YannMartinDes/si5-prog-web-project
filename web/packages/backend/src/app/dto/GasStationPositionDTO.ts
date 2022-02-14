import { GasPrice, GasStationPosition, Position } from "@web/common/dto";
import { Station } from "../schemas/station.schema";

export class GasStationPositionDTO implements GasStationPosition{
    constructor(id:string,position:Position,address:string,prices:GasPrice[]){
        this.id = id;
        this.position = position;
        this.address = address;
        this.prices = prices;
    }
    id: string;
    position: Position;
    address: string;
    prices: GasPrice[];

    static fromStation(station:Station):GasStationPositionDTO{
        const position:Position={
            lat:station.position.coordinates[1],
            lon:station.position.coordinates[0]
        }
        const prices: GasPrice[] = station.fuels?.map(((elt: { name: any; price: any; })=>{return {gasType:elt.name,price:elt.price}}))||[]

        return new GasStationPositionDTO(station._id, position,station.address,prices);
    }
}