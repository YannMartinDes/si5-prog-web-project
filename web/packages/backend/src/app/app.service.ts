import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Cron , CronExpression} from '@nestjs/schedule';
import { Connection, Model } from 'mongoose';
import { CreateStationDto } from './schemas/createStationDto';
import { Station } from './schemas/station.schema';
const convert = require('xml-js');
const axios = require("axios");
const AdmZip = require('adm-zip');
@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection,
    @InjectModel("STATION") private readonly stationModel: Model<Station>,
  ) { }

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

  async get(url:string) {
    const options =  { 
        method: 'GET',
        url: url,
        responseType: "arraybuffer"
    };
    const { data } = await axios(options);
    return data;
  }
  
  async getAndUnZip(url:string) {
    const zipFileBuffer = await this.get(url);
    const zip = await new AdmZip(zipFileBuffer);
    const entries = await zip.getEntries();
    for(let entry of entries) {
        const buffer = entry.getData();
        return buffer.toString("latin1");
    }
  }
  async getJsonFromUrl(url:string){
    let xml=await this.getAndUnZip(url)
    return convert.xml2json(xml, {compact: true});
  }

  async loadFromUrl(url:string) {
      let resultJson=await this.getJsonFromUrl(url);
      let dict=JSON.parse(resultJson)
      let arrayLocal=[]
      for (const element of dict["pdv_liste"]["pdv"]){
          element["_id"]=element["_attributes"]["id"]
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

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {  
    const today = new Date()
    const date = new Date(today)

    date.setDate(date.getDate() - 1)
    let day = date.toString().split(" ")[2]
    let month = date.getUTCMonth()+1

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