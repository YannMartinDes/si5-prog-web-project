import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Station } from '../schemas/station.schema';

@Injectable()
export class StationService {

  constructor(
    @InjectModel("STATION") private readonly stationModel: Model<Station>,
  ){

  }

  async update(id, station: Station): Promise<Station> {
    return await this.stationModel.findByIdAndUpdate(id, station, { new: true })
  }

  async delete(id): Promise<Station> {
    return await this.stationModel.findByIdAndRemove(id);
  }

  async createIndex(): Promise<string> {
    return await this.stationModel.collection.createIndex({coordinates:"2dsphere"});
  }

  async findSphere(longitudeCurrent:number,latitudeCurrent:number,maxDist:number){
    return await this.stationModel.find({coordinates:{ $nearSphere: { $geometry: { type: "Point", coordinates: [ longitudeCurrent, latitudeCurrent ] }, $maxDistance: maxDist } } }).exec();
  }

    async findAll(query): Promise<Station[]> {
    console.log(query)
    return this.stationModel.find(query).exec();
  }


  async readById(id): Promise<Station> {
    return await this.stationModel.findById(id).exec();
  }

}
