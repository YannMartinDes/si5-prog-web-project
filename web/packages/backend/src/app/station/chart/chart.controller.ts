import { Controller, Get, Query } from "@nestjs/common";
import { FuelTypePrice } from "@web/common/dto";
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
}