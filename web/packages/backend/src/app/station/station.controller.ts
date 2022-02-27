import { Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import { StationService } from './station-repository.service';
import {Filter, GasStationInfo, GasStationPosition, UserIssue} from '@web/common/dto';
import { GasStationPositionDTO } from '../dto/GasStationPositionDTO';
import { GasStationInfoDTO } from '../dto/GasStationInforDTO';
import { StationFilterList } from './station-filter-list.service';

@Controller('station')
export class StationController {

  constructor(private stationRepository:StationService,
    private stationFilterService:StationFilterList){}

  @Get('near-station')
  public async getAllNearStation(@Query('longitude') longitude:number,@Query('latitude') latitude:number,@Query('maxDist') maxDist:number,@Query('filter') filter:string):Promise<GasStationPosition[]> {
    console.log("Receive call with "+longitude+" "+latitude+" "+maxDist+" "+filter);
    
    const query = this.stationRepository.createFilterQuery(longitude,latitude,maxDist,JSON.parse(filter))
    const stations = await this.stationRepository.findSphere(query);
    
    return stations.map((elt)=>GasStationPositionDTO.fromStation(elt));
  }
  
  @Get('stations/:id')
  async findById(@Param('id') id:string):Promise<GasStationInfo> {
      console.log("Stations Id : call with "+id);
      const station = await this.stationRepository.findStationById(id)
      if(station) {
        return GasStationInfoDTO.fromStation(station);
      }
      throw "STATION '"+id+"' NOT FOUND";
  }

  @Post('report')
  userIssue(@Body('issue') issue:UserIssue){
    console.log("Receive user issue for station "+issue.stationId+" : "+issue.userMsg);
  }

  //Raw data
  @Get('fuel-type')
  async getAllFuelType() {
      const distinctFuel:string[] = await this.stationFilterService.getFuelsList();
      console.log("Send all fuel type")
      return distinctFuel;
  }

  @Get('service-type')
  async getAllServiceType() {
      const distinctService:string[] = await this.stationFilterService.getServicesList();
      console.log("Send all services type")
      return distinctService;
  }

  @Get('city')
  async getAllCity() {
      const distinctCity:string[] = await this.stationFilterService.getCityList();
      console.log("Send all city")
      return distinctCity;
  }
}
