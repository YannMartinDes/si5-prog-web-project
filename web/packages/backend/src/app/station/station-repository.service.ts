import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Station } from '../schemas/station.schema';
import {Filter,GasStationPosition,Position,GasPrice, GasStationInfo, GasStationSchedule} from '@web/common/dto';
import {getGasServicesArray, getID,getGasPrices,getAdresseText, getCoordinates, stringServicesArray, getGasStationSchedule, createQueryNearWithFilter } from 'packages/common/dto/src/lib/utils';

@Injectable()
export class StationService {

  async createTextIndexWithWildCardForAll() {
    return await this.stationModel.collection.createIndex( { "$**": "text" } )
  }

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
    let query = createQueryNearWithFilter(longitudeCurrent,latitudeCurrent,maxDist,filter)

    let listGasStationPosition : GasStationPosition[] =[]
    let stations : Station[] = await this.stationModel.find(query).exec();
    
    for (let station of stations){

      let id=getID(station)
      let pos:Position=getCoordinates(station)
      let address=getAdresseText(station)
      let gasPrice :GasPrice[] = getGasPrices(station)
      let gasPos : GasStationPosition = {id:id,position:pos,address:address,prices:gasPrice}  
      listGasStationPosition.push(gasPos)
    }
    return listGasStationPosition
  }

  async findAll(query:any): Promise<Station[]> {
    let stations : Station[] = await this.stationModel.find(query).exec();
    return stations
  }

  async findAllText(query:any): Promise<GasStationPosition[]> {
    let listGasStationPosition : GasStationPosition[] =[]
    let stations : Station[] = await this.stationModel.find(query).exec();
  
    for (let station of stations){
      let id=getID(station)
      let pos:Position=getCoordinates(station)
      let address=getAdresseText(station)
      let gasPrice :GasPrice[] =getGasPrices(station)
      let gasPos : GasStationPosition = {id:id,position:pos,address:address,prices:gasPrice}  
      listGasStationPosition.push(gasPos)
    }
    return listGasStationPosition
  }


  async readById(id:string){
    let stations : Station[] = await this.stationModel.find({"_attributes.id":id}).exec();
    //console.log("\n\n\n"+JSON.stringify(stations)+"\n\n\n");

    let listGasStationInfo : GasStationInfo[] =[]
    for (let station of stations){
      let address=getAdresseText(station)
      let id=getID(station)
      let gasServicesArray =getGasServicesArray(station)
      let schedules: GasStationSchedule[] = getGasStationSchedule(station)
      let gasPrice :GasPrice[] = getGasPrices(station)
      let gasStationInfoToPush : GasStationInfo = {id:id,address:address,prices:gasPrice,services:gasServicesArray,schedules:schedules}  
      listGasStationInfo.push(gasStationInfoToPush)
    }
    //console.log(JSON.stringify(listGasStationInfo[0]))
    return listGasStationInfo[0]
  }

  findDistinctFuelType(){ //TODO store in separete schema (not optimise)
    return this.stationModel.distinct("prix._attributes.nom").exec();
  }

  findDistinctServices(){ //TODO store in separete schema (not optimise)
    return this.stationModel.distinct("services.service._text").exec();
  }
}

