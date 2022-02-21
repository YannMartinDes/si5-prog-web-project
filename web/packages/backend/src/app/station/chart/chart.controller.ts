import { Controller, Get, Query } from "@nestjs/common";
import { FuelTypePrice } from "@web/common/dto";
import FuelStationPriceOrder from "packages/common/dto/src/lib/chart/fuel-station-price-order";
import { ChartService } from "./chart.service";

@Controller('chart')
export class ChartController {

    constructor(
      private chartService:ChartService
    ){}
    
    @Get('general-fuels-price')
    public async getAllNearStation(@Query('longitude') longitude:number,@Query('latitude') latitude:number,@Query('maxDist') maxDist:number,@Query('filter') filter:string) :Promise<FuelTypePrice[]>{
      console.log("Receive call with "+longitude+" "+latitude+" "+maxDist+" "+JSON.stringify(filter));

      const filterParse = filter? JSON.parse(filter):undefined
      return this.chartService.averagePriceByFuelType(longitude,latitude,maxDist,filterParse).then((result)=>
        result.map((elt)=>{
                return {
                fuelType:elt._id,
                avgPrice:elt.avgPrice,
                maxPrice:elt.maxPrice,
                minPrice:elt.minPrice
                }
            }
        )
      )
    }

    @Get('fuels-station-order-price')
    public async getFuelsStationOrderedPrice(@Query('longitude') longitude:number,@Query('latitude') latitude:number,
      @Query('maxDist') maxDist:number,@Query('filter') filter:string,@Query('maxStation') maxStation:number) :Promise<FuelStationPriceOrder[]>{
      console.log("Receive call with "+longitude+" "+latitude+" "+maxDist+" "+JSON.stringify(filter));

      const filterParse = filter? JSON.parse(filter):undefined
      return this.chartService.fuelPriceOrderByStation(longitude,latitude,maxDist,filterParse,maxStation).then(result=>
        result.map(elt=>{
          let stations:{
            idStation: string,
            address: string,
            price: number
          }[]=[]
          if(elt.stations){
            stations = elt.stations.map(station=>{
              return({
                address:station.address,
                idStation:station.idStation,
                price:station.price
              })

            })
          }
          return {
            fuel:elt._id,
            stations:stations
          }
        }
        )
      )
    }
}