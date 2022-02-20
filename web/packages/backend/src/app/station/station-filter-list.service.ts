import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Station } from '../schemas/station.schema';

@Injectable()
export class StationFilterList {
    fuelsList:string[] = []
    servicesList:string[] = []
    cityList:string[] = []

    constructor(
        @InjectModel("STATION") private readonly stationModel: Model<Station>,
    ) {

    }
    onModuleInit(){
        this.refreshList()
    }

    async refreshList(){
        await Promise.all([this.refreshFuelsList(),
        this.refreshServicesList(),
        this.refreshCityList()])
    }
    async refreshFuelsList(){
        const fuelsList = await this.stationModel.distinct("fuels.name").exec();
        if(fuelsList){
            this.fuelsList=fuelsList
        }
    }
    async refreshServicesList(){
        const servicesList = await this.stationModel.distinct("services").exec();
        if(servicesList){
            this.servicesList=servicesList
        }
    }
    async refreshCityList(){
        const cityList = await this.stationModel.distinct("city").exec().then((result) => [... new Set(result.map((elt: string) => elt.toLowerCase()))]);
        if(cityList){
            this.cityList=cityList
        }
    }

    async getCityList(){
        if(this.cityList.length==0){ //force refresh need
            await this.refreshCityList()
        }
        return [...this.cityList]
    }
    async getServicesList(){ //force refresh need
        if(this.servicesList.length==0){
            await this.refreshServicesList()
        }
        return [...this.servicesList]
    }
    async getFuelsList(){
        if(this.fuelsList.length==0){ //force refresh need
            await this.refreshFuelsList()
        }
        return [...this.fuelsList]
    }
}

