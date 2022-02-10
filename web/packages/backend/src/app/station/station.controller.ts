import { Body, Controller, Get, Param, Query} from '@nestjs/common';
import { StationService } from './station-repository.service';
import {Filter} from '@web/common/dto';

@Controller('station')
export class StationController {

  constructor(private stationRepository:StationService){}

  @Get('/:id')
  async findById(@Param('id') id:string) {
      const station = await this.stationRepository.readById(id);
      return station;
  }

  @Get('near-station')
  public async getAllNearStation(@Query('longitude') longitude:string,@Query('latitude') latitude:string,@Query('maxDist') maxDist:string,@Query('filter') filter:Filter) {
    console.log("Receive call with "+longitude+" "+latitude+" "+maxDist+" "+JSON.stringify(filter));
    const stations = await this.stationRepository.findSphere(+longitude,+latitude,+maxDist,filter);
    return stations;
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

