import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environment } from '../environments/environment';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${environment.DATABASE}`)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
