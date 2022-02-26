import { Module } from '@nestjs/common';
import { FavoriteStationController } from './favorite-station.controller';
import { FavoriteStationService } from './favorite-station.service';

@Module({
  controllers: [FavoriteStationController],
  providers: [FavoriteStationService]
})
export class FavoriteStationModule {}
