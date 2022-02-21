import { Controller, Get, Param, Query} from '@nestjs/common';
import { StationService } from './station-repository.service';
import {Filter, GasStationInfo, GasStationPosition} from '@web/common/dto';
import { GasStationPositionDTO } from '../dto/GasStationPositionDTO';
import { GasStationInfoDTO } from '../dto/GasStationInforDTO';
import { StationFilterList } from './station-filter-list.service';

@Controller('station')
export class StationController {

  constructor(private stationRepository:StationService,
    private stationFilterService:StationFilterList){}


  @Get('near-station')
  public async getAllNearStation(@Query('longitude') longitude:number,@Query('latitude') latitude:number,@Query('maxDist') maxDist:number,@Query('filter') filter:string):Promise<GasStationPosition[]> {
    console.log("Receive call with "+longitude+" "+latitude+" "+maxDist+" "+JSON.stringify(filter));
    const query = this.stationRepository.createFilterQuery(longitude,latitude,maxDist,JSON.parse(filter))
    const stations = await this.stationRepository.findSphere(query);
    return stations.map((elt)=>GasStationPositionDTO.fromStation(elt));
  }
  // @Get('find')
  // public async findAllQuery(@Query('text') text:string,@Query('caseSensitive') caseSensitive:boolean) {
  //   console.log("Receive call for find : "+text);

  //   const stations = await this.stationRepository.findAllText(
  //     { "$text": { "$search": text,
  //                             $caseSensitive: caseSensitive,
  //                             $diacriticSensitive: false
  //                 }
  //     })
      
  //   return stations;
  // }
  
  @Get('stations/:id')
  async findById(@Param('id') id:string):Promise<GasStationInfo> {
      console.log("Stations Id : call with "+id);
      const station = await this.stationRepository.findStationById(id)
      if(station) {
        return GasStationInfoDTO.fromStation(station);
      }
      throw "STATION '"+id+"' NOT FOUND";
  }

  @Get('fuel-type')
  async getAllFuelType() {
      const distinctFuel:string[] = await this.stationFilterService.getFuelsList();
      // console.log(JSON.stringify(distinctFuel))
      return distinctFuel;
  }


  @Get('service-type')
  async getAllServiceType() {
      const distinctService:string[] = await this.stationFilterService.getServicesList();
      // console.log(JSON.stringify(distinctService))
      return distinctService;
  }

  @Get('city')
  async getAllCity() {
      const distinctCity:string[] = await this.stationFilterService.getCityList();
      // console.log(JSON.stringify(distinctCity))
      return distinctCity;
  }
}



// OLD --------------------------------------------------------------
  // @Get()
  // getData() {
  //   return this.appService.getData();
  // }

  // @Put('/upall')
  // async loadFrom(@Res() res, @Body() body) {
  //     console.log(body)
  //     const station = await this.appService.loadFromUrl(body.url);
  //     await this.appService.createIndex();
  //     return res.status(HttpStatus.OK).json({
  //       message: 'Stations has been created successfully',
  //       status:201
  //     })
  // }

  // @Post("add-station")
  // public async addStation(
  //   @Res() res,
  //   @Body() createStationDto: CreateStationDto,
  // ) {
  //   try {
  //     const station = await this.appService.create(createStationDto);
  //     return res.status(HttpStatus.OK).json({
  //       message: 'Station has been created successfully',
  //       status:201
  //     });
  //   } catch (err) {
  //     return res.status(HttpStatus.BAD_REQUEST).json({
  //       message: 'Error: Station not created!',
  //       status: 400,
  //     });
  //   }
  // }

  // @Get('get-station')
  // public async getAllStation(
  //   @Res() res, @Body() Body,
  // ) {
  //   const stations = await this.appService.findAll(Body);
  //   return res.status(HttpStatus.OK).json(stations);
  // }


  // @Get()
  // getStationInfo() {
  //   return this.appService.retrieveStationInfo(1);
  // }


  // @Put(':id')
  // async update(@Res() response, @Param('id') id, @Body() station: Station) {
  //     const updatedBook = await this.appService.update(id, station);
  //     return response.status(HttpStatus.OK).json({
  //         updatedBook
  //     })
  // }

  // @Delete(':id')
  // async delete(@Res() response, @Param('id') id) {
  //     const deletedBook = await this.appService.delete(id);
  //     return response.status(HttpStatus.OK).json({
  //         deletedBook
  //     })
  // }

