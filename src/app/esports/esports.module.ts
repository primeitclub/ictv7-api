import { Module } from '@nestjs/common';
import { EsportsController } from './esports.controller';
import { EsportsService } from './esports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EsportesGame } from './models/Esports.entity';
import { EsportsTeam } from './models/EsportsTeam.model';

@Module({
  imports: [TypeOrmModule.forFeature([EsportesGame, EsportsTeam])],
  controllers: [EsportsController],
  providers: [EsportsService]
})
export class EsportsModule {}
