import { Body, Controller, Get, HttpStatus, Post, Res ,Put,Delete,Param} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateStationDto } from './schemas/createStationDto';
import { Station } from './schemas/station.schema';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Put('/upall')
  async loadFrom(@Res() res, @Body() body) {
      console.log(body)
      const station = await this.appService.loadFromUrl(body.url);
      await this.appService.createIndex();
      return res.status(HttpStatus.OK).json({
        message: 'Stations has been created successfully',
        status:201
      })
  }

  @Post("add-station")
  public async addStation(
    @Res() res,
    @Body() createStationDto: CreateStationDto,
  ) {
    try {
      const station = await this.appService.create(createStationDto);
      return res.status(HttpStatus.OK).json({
        message: 'Station has been created successfully',
        status:201
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Station not created!',
        status: 400,
      });
    }
  }
  
  @Get('get-station')
  public async getAllStation(
    @Res() res, @Body() Body,
  ) {
    const stations = await this.appService.findAll(Body);
    return res.status(HttpStatus.OK).json(stations);
  }

  @Get('get-near-station/:longitude/:latitude/:maxDist')
  public async getAllNearStation(@Res() res,@Param('longitude') longitude,@Param('latitude') latitude,@Param('maxDist') maxDist) {
    const stations = await this.appService.findSphere(longitude,latitude,maxDist);
    return res.status(HttpStatus.OK).json(stations);
  }

  @Get()
  getStationInfo() {
    return this.appService.retrieveStationInfo(1);
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
      const station = await this.appService.readById(id);
      return response.status(HttpStatus.OK).json({
          station
      })
  }

  @Put(':id')
  async update(@Res() response, @Param('id') id, @Body() station: Station) {
      const updatedBook = await this.appService.update(id, station);
      return response.status(HttpStatus.OK).json({
          updatedBook
      })
  }

  @Delete(':id')
  async delete(@Res() response, @Param('id') id) {
      const deletedBook = await this.appService.delete(id);
      return response.status(HttpStatus.OK).json({
          deletedBook
      })
  }


}
