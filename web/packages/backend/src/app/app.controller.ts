import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateStationDto } from './schemas/createStationDto';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
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
        station,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Station not created!',
        status: 400,
      });
    }
  }
  @Get('get-station')
  public async getAllCustomer(
    @Res() res,
  ) {
    const stations = await this.appService.findAll();
    return res.status(HttpStatus.OK).json(stations);
  }

  @Get()
  getStationInfo() {
    return this.appService.retrieveStationInfo(1);
  }
}
