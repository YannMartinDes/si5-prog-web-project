import { Controller, Get } from "@nestjs/common";
import { FuelTypePrice } from "@web/common/dto";
import { ChartService } from "./chart.service";

@Controller('chart')
export class ChartController {

    constructor(private chartService:ChartService){}
    
    @Get('general-fuels-price')
    public async getAllNearStation() :Promise<FuelTypePrice[]>{
      return this.chartService.averagePriceByFuelType().then((result)=>
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