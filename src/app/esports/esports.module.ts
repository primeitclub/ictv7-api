import { Module } from '@nestjs/common';
import { EsportsController } from './esports.controller';
import { EsportsService } from './esports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EsportesGame } from './models/Esports.entity';
import { EsportsTeam } from './models/EsportsTeam.entity';
import { MulterModule } from '@nestjs/platform-express';
import { esportsMulterConfig } from 'src/config/multer.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([EsportesGame, EsportsTeam]),
    MulterModule.register(esportsMulterConfig)
  ],
  controllers: [EsportsController],
  providers: [EsportsService]
})
export class EsportsModule {}
