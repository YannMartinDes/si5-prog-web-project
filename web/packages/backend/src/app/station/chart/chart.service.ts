import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Station } from '../../schemas/station.schema';

@Injectable()
export class ChartService {
    constructor(
        @InjectModel("STATION") private readonly stationModel: Model<Station>,
    ) {}

    async averagePriceByFuelType(){
        const metric:{
            _id:string,
            avgPrice:number,
            maxPrice:number,
            minPrice:number
        }[] = await this.stationModel.aggregate([
            {
              $unwind:"$fuels"
            },
            {
              $group:
                {
                  _id: "$fuels.name",
                  avgPrice: { $avg: '$fuels.price'} ,
                  maxPrice: { $max: '$fuels.price'} ,
                  minPrice: { $min: '$fuels.price'} ,
                }
            }
          ])
        return metric
    }
}