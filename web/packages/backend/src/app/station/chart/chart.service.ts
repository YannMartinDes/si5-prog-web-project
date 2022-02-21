import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Filter } from '@web/common/dto';
import { FilterQuery, Model, PipelineStage } from 'mongoose';
import { Station } from '../../schemas/station.schema';

@Injectable()
export class ChartService {
  constructor(
    @InjectModel("STATION") private readonly stationModel: Model<Station>,
  ) { }


  async averagePriceByFuelType(longitudeCurrent: number, latitudeCurrent: number, maxDist: number, filter: Filter) {

    const aggregateQuery: PipelineStage[] = []
    const query: FilterQuery<Station> = {}

    if (filter) {
      if (filter.services?.length > 0) {
        query.services = { $all: filter.services }
      }
      if (filter.gas?.length > 0) {
        query["fuels.name"] = { $in: filter.gas }
      }
    }

    if (longitudeCurrent && latitudeCurrent && maxDist) {
      console.log(maxDist)
      aggregateQuery.push({
        $geoNear: {
          near: { type: "Point", coordinates: [longitudeCurrent, latitudeCurrent] },
          distanceField: "dist.calculated",
          maxDistance: maxDist,
          includeLocs: "dist.location",
          spherical: true
        }
      })
    }

    aggregateQuery.push(
      {
        $unwind: "$fuels"
      },
      { $match: query },
      {
        $group:
        {
          _id: "$fuels.name",
          avgPrice: { $avg: '$fuels.price' },
          maxPrice: { $max: '$fuels.price' },
          minPrice: { $min: '$fuels.price' },
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    );

    const metric: {
      _id: string,
      avgPrice: number,
      maxPrice: number,
      minPrice: number
    }[] = await this.stationModel.aggregate(aggregateQuery)
    return metric
  }



  async fuelPriceOrderByStation(longitudeCurrent: number, latitudeCurrent: number, maxDist: number,filter: Filter, maxStation=10 ){
    const aggregateQuery: PipelineStage[] = []
    const query: FilterQuery<Station> = {}

    if (filter) {
      if (filter.services?.length > 0) {
        query.services = { $all: filter.services }
      }
      if (filter.gas?.length > 0) {
        query["fuels.name"] = { $in: filter.gas }
      }
    }

    if (longitudeCurrent && latitudeCurrent && maxDist) {
      console.log(maxDist)
      aggregateQuery.push({
        $geoNear: {
          near: { type: "Point", coordinates: [longitudeCurrent, latitudeCurrent] },
          distanceField: "dist.calculated",
          maxDistance: maxDist,
          includeLocs: "dist.location",
          spherical: true
        }
      })
    }

    aggregateQuery.push(
      {
        $unwind:'$fuels'
      },
      {
        $sort: {
          "fuels.price":1
        }
      },
      {
        $group:
        {
          _id: "$fuels.name",
          
          stations:{$push:{idStation:"$_id",address:"$address",price:"$fuels.price"}}
        }
      },
      {
        $project: {
            stations: {
                $slice: ["$stations", 0, maxStation]
            }
        }
      },
      {
        $sort: {
          _id: 1      
        }
      }
    );

    const metric: {
      _id: string,
      stations: {
        idStation: string,
        address: string,
        price: number
      }[]
    }[] = await this.stationModel.aggregate(aggregateQuery)
    return metric
  }
}

