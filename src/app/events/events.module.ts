import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventParticipants, Events } from './models/Events.entity';
import { Speaker } from './models/Speaker.entity';
import { SpeakerController } from './speaker.controller';
import { SpeakerService } from './speaker.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';
import { User } from '../user/model/User.entity';
import { IdeathonEntiy } from './models/Competition.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Events,
      Speaker,
      User,
      EventParticipants,
      IdeathonEntiy
    ]),
    MulterModule.register(multerConfig)
  ],
  controllers: [EventsController, SpeakerController],
  providers: [EventsService, SpeakerService, MailService]
})
export class EventsModule {}
