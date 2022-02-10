import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import AdmZip = require('adm-zip');
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import convert = require('xml-js');
import { Station } from '../../schemas/station.schema';
import { StationService } from '../station-repository.service';

@Injectable()
export class StationLoaderService {
  private URL_API_GOUV = "https://donnees.roulez-eco.fr/opendata/instantane"

  constructor(private http:HttpService,
    private stationRepository:StationService,
    @InjectModel("STATION") private readonly stationModel: Model<Station>,

    ){

  }

  onModuleInit(){
    this.refreshStation();
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async refreshStation() {
    // const today = new Date()
    // const date = new Date(today)

    // date.setDate(date.getDate() - 1)
    // const day = date.toString().split(" ")[2]
    // const month = date.getUTCMonth()+1

    // let url = ""

    // if (month<10){
    //   url="https://donnees.roulez-eco.fr/opendata/jour/"+date.getFullYear()+ "0"+month+day
    // }
    // else {
    //   url="https://donnees.roulez-eco.fr/opendata/jour/"+date.getFullYear()+ month +day}
    console.log("CRON: start update from gouv api")
    await this.loadStation();
    await this.stationRepository.createIndex();
    console.log("CRON: successful update")

  }

  async getAndUnZip() :Promise<string>{
    const zipFileBuffer:Buffer = await firstValueFrom(this.http.get(this.URL_API_GOUV,{responseType: "arraybuffer"})).then((data)=>data.data);
    const zip = new AdmZip(zipFileBuffer);
    const entries = await zip.getEntries();
    for(const entry of entries) {
        const buffer = entry.getData();
        return buffer.toString("latin1");
    }
    throw "unable to update data"
  }
  async getJsonFromUrl(){
    const xml=await this.getAndUnZip()
    return convert.xml2json(xml, {compact: true});
  }

  async loadStation() :Promise<Station[]>{
      const resultJson=await this.getJsonFromUrl();
      const dict=JSON.parse(resultJson)
      const arrayLocal:Station[]=[]
      for (const element of dict["pdv_liste"]["pdv"]){
          element["coordinates"]= [element["_attributes"]["longitude"]*0.00001 , element["_attributes"]["latitude"]*0.00001]
          arrayLocal.push(element)
      }
      await this.stationModel.deleteMany();
      return await this.stationModel.insertMany(arrayLocal)
  }

  // deltaDate(input, days, months, years) {
  //   return new Date(
  //     input.getFullYear() + years,
  //     input.getMonth() + months,
  //     Math.min(
  //       input.getDate() + days,
  //       new Date(input.getFullYear() + years, input.getMonth() + months + 1, 0).getDate()
  //     )
  //   );
  // }
}
