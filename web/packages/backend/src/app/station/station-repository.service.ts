import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Station } from '../schemas/station.schema';
import {Filter,GasStationPosition,Position,GasPrice} from '@web/common/dto';

@Injectable()
export class StationService {

  constructor(
    @InjectModel("STATION") private readonly stationModel: Model<Station>,
  ){

  }

  async update(id:string, station: Station){
    return await this.stationModel.findByIdAndUpdate(id, station, { new: true })
  }

  async delete(id:string){
    return await this.stationModel.findByIdAndRemove(id);
  }

  async createIndex(): Promise<string> {
    return await this.stationModel.collection.createIndex({coordinates:"2dsphere"});
  }

  async findSphere(longitudeCurrent:number,latitudeCurrent:number,maxDist:number,filter:Filter){
    let listCondition=[]
    let listOrGasType = []
    if (filter.gas.length == 0){
      filter.gas=["Gazole",
        "SP95",
        "E85",
        "GPLc",
        "E10",
        "SP98"]
    }
    for (const gasType of filter.gas){

      listOrGasType.push({ prix : { $elemMatch : { "_attributes.nom": gasType }} } )}


    let query ={coordinates:{ $nearSphere: { $geometry: { type: "Point", coordinates: [ longitudeCurrent, latitudeCurrent ] }, $maxDistance: maxDist }},
    "$or":listOrGasType}
    let listGasStationPosition : GasStationPosition[] =[]
    console.log(JSON.stringify(query))
    let stations : Station[] = await this.stationModel.find(query).exec();

    for (let station of stations){
      let address=""
      let id=""
      let pos:Position={lat:0,lon:0}
      let gasInfoArray = []
      if (station?.adresse?._text){
        address=station.adresse._text}
      if (station?.coordinates){
        let latLongArray:number[]=station.coordinates
        pos.lon=latLongArray[0]
        pos.lat=latLongArray[1]
      }
      if (station?._id){
        id=station._id
      }
      if (station?.prix){
        for (const gasInfo of station.prix){
          gasInfoArray.push({gasType:gasInfo._attributes.nom,price:gasInfo._attributes.valeur})
        }
      }
      let gasPrice :GasPrice[] = gasInfoArray
      
      let gasPos : GasStationPosition = {id:id,position:pos,address:address,prices:gasPrice}  
      listGasStationPosition.push(gasPos)
    }
    return listGasStationPosition
  }

    async findAll(query:any): Promise<Station[]> {
    console.log(query)
    return this.stationModel.find(query).exec();
  }


  async readById(id:string){
    return await this.stationModel.findById(id).exec();
  }

}
