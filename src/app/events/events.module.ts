import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './models/Event.entity';
import { Speaker } from './models/Speaker.model';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Speaker])],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
