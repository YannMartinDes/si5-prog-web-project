import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


import { AppController } from './app.controller';
import { AppService } from './app.service';

import { StationSchema } from './schemas/station.schema';
import { environment } from '../environments/environment';

import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../services/authentication-service/src/auth/auth.module';
import { UsersModule } from '../services/authentication-service/src/users/users.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(environment.DATABASE,{authSource:"admin"}),
    MongooseModule.forFeature([
      { name:"STATION",schema: StationSchema },
    ]),
    HttpModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
