import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
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
  async findAll(): Promise<Station[]> {
    return this.stationModel.find().exec();
  }


  async readById(id): Promise<Station> {
    return await this.stationModel.findById(id).exec();
  }

  async update(id, station: Station): Promise<Station> {
    return await this.stationModel.findByIdAndUpdate(id, station, { new: true })
  }

  async delete(id): Promise<any> {
    return await this.stationModel.findByIdAndRemove(id);
  }

  async get(url) {
    const options =  { 
        method: 'GET',
        url: url,
        responseType: "arraybuffer"
    };
    const { data } = await axios(options);
    return data;
  }
  
  async getAndUnZip(url) {
    const zipFileBuffer = await this.get(url);
    const zip = new AdmZip(zipFileBuffer);
    const entries = zip.getEntries();
    for(let entry of entries) {
        const buffer = entry.getData();
        return buffer.toString("latin1");
    }
  }
  async getJsonFromUrl(url){
    let xml=await this.getAndUnZip(url)
    return convert.xml2json(xml, {compact: true});
  }

  async loadFromUrl(url:string): Promise<any[]> {
      let resultJson=await this.getJsonFromUrl(url);
      let dict=JSON.parse(resultJson)
      let arrayLocal=[]
      for (const element of dict["pdv_liste"]["pdv"]){
          arrayLocal.push(element)
          }
      console.log(arrayLocal)
    return this.stationModel.insertMany(arrayLocal)
  }


  /**
   * Method to retrieve information of a station such as its name and essence price.
   * @param stationId
   */
  retrieveStationInfo(stationId: number) {

  }
}
