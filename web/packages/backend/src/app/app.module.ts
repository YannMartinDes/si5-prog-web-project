import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environment } from '../environments/environment';

import { StationSchema } from './schemas/station.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${environment.DATABASE}`),
    MongooseModule.forFeature([
      { name:"STATION",schema: StationSchema },
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
