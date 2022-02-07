import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Cron , CronExpression} from '@nestjs/schedule';
import AdmZip = require('adm-zip');
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { CreateStationDto } from './schemas/createStationDto';
import { Station } from './schemas/station.schema';
import convert = require('xml-js');

@Injectable()
export class AppService {
  constructor(
    private http:HttpService,
    @InjectModel("STATION") private readonly stationModel: Model<Station>,
  ) { }

  onModuleInit(){
    this.handleCron();
  }
  getData(): { message: string } {
    return ({ message: 'Welcome to backend!' });
  }

  public async create(
    createStationDto: CreateStationDto,
  ): Promise<Station> {
    const newStation = await new this.stationModel(createStationDto);
    return newStation.save();
  }

  async findAll(query): Promise<Station[]> {
    console.log(query)
    return this.stationModel.find(query).exec();
  }


  async readById(id): Promise<Station> {
    return await this.stationModel.findById(id).exec();
  }

  async update(id, station: Station): Promise<Station> {
    return await this.stationModel.findByIdAndUpdate(id, station, { new: true })
  }

  async delete(id): Promise<Station> {
    return await this.stationModel.findByIdAndRemove(id);
  }

  async createIndex(): Promise<any> {
    return await this.stationModel.collection.createIndex({coordinates:"2dsphere"});
  }

  async findSphere(longitudeCurrent,latitudeCurrent,maxDist){
    return await this.stationModel.find({coordinates:{ $nearSphere: { $geometry: { type: "Point", coordinates: [ longitudeCurrent, latitudeCurrent ] }, $maxDistance: maxDist } } }).exec();
  }


  async getAndUnZip(url:string) {
    const zipFileBuffer:Buffer = await firstValueFrom(this.http.get(url,{responseType: "arraybuffer"})).then((data)=>data.data);
    const zip = new AdmZip(zipFileBuffer);
    const entries = await zip.getEntries();
    for(const entry of entries) {
        const buffer = entry.getData();
        return buffer.toString("latin1");
    }
  }
  async getJsonFromUrl(url:string){
    const xml=await this.getAndUnZip(url)
    return convert.xml2json(xml, {compact: true});
  }

  async loadFromUrl(url:string) {
      const resultJson=await this.getJsonFromUrl(url);
      const dict=JSON.parse(resultJson)
      const arrayLocal=[]
      for (const element of dict["pdv_liste"]["pdv"]){
          element["coordinates"]= [element["_attributes"]["longitude"]*0.00001 , element["_attributes"]["latitude"]*0.00001]
          arrayLocal.push(element)
          }
      console.log("Update data in progress")
      await this.stationModel.deleteMany()
      return this.stationModel.insertMany(arrayLocal)
  }


  /**
   * Method to retrieve information of a station such as its name and essence price.
   * @param stationId
   */
  retrieveStationInfo(stationId: number) {

  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCron() {
    const today = new Date()
    const date = new Date(today)

    date.setDate(date.getDate() - 1)
    const day = date.toString().split(" ")[2]
    const month = date.getUTCMonth()+1

    let url = ""

    if (month<10){
      url="https://donnees.roulez-eco.fr/opendata/jour/"+date.getFullYear()+ "0"+month+day
    }
    else {
      url="https://donnees.roulez-eco.fr/opendata/jour/"+date.getFullYear()+ month +day}
    await this.createIndex()
    await this.loadFromUrl(url)
    console.log('Called '+url+' every 5 minutes at '+ (new Date().toString()))




  }

  deltaDate(input, days, months, years) {
    return new Date(
      input.getFullYear() + years,
      input.getMonth() + months,
      Math.min(
        input.getDate() + days,
        new Date(input.getFullYear() + years, input.getMonth() + months + 1, 0).getDate()
      )
    );
}
}
