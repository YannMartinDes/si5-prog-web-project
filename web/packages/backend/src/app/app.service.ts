import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateStationDto } from './schemas/createStationDto';
import { Station } from './schemas/station.schema';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection,
    @InjectModel("STATION") private readonly stationModel: Model<Station>,
  ) {}

  getData(): { message: string } {
    return ({ message: 'Welcome to backend!' });
  }
  public async create(
    createStationDto: CreateStationDto,
  ): Promise<Station> {
    const newStation = await new this.stationModel(createStationDto);
    return newStation.save();
  }
  async findAll(): Promise<Station[]> {
    return this.stationModel.find().exec();
  }
}
