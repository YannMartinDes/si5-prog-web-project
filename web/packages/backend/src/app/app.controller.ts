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
  async loadFrom(@Res() res, @Body('body') body) {
      console.log(body)
      const station = await this.appService.loadFromUrl(body.url);
      return res.status(HttpStatus.OK).json(station)
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
