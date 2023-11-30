import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './models/Event.entity';
import { Speaker } from './models/Speaker.entity';
import { SpeakerController } from './speaker.controller';
import { SpeakerService } from './speaker.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Speaker]),
    MulterModule.register(multerConfig)
  ],
  controllers: [EventsController, SpeakerController],
  providers: [EventsService, SpeakerService]
})
export class EventsModule {}
