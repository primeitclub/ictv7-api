import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../user/model/User.entity';
import { ideathonTeam } from './events.dto';
import { IdeathonEntiy } from './models/Competition.entity';
import { EventParticipants, Events } from './models/Events.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private eventRepository: Repository<Events>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(EventParticipants)
    private eventParticipantsRepo: Repository<EventParticipants>,
    @InjectRepository(IdeathonEntiy)
    private IdeathonEntiy: Repository<IdeathonEntiy>,
    private readonly mailService: MailService
  ) {}

  async getAllEvents() {
    const events = await this.eventRepository.find({
      relations: { users: true }
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'List of events.',
      events
    };
  }

  async getEvent(id: number) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: { users: true }
    });

    if (!event)
      throw new HttpException('Event not found.', HttpStatus.NOT_FOUND);

    return {
      statusCode: HttpStatus.OK,
      message: 'Event fetched successfully.',
      event
    };
  }

  async createEvent(request, eventThumbnail) {
    const { slug } = request;

    const slugAlreadyInUse = await this.eventRepository.findOne({
      where: { slug }
    });

    if (slugAlreadyInUse)
      throw new HttpException('Slug is already in use.', HttpStatus.CONFLICT);

    const event = await this.eventRepository.save({
      ...request,
      eventThumbnail
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'New event created successfully.',
      event
    };
  }

  async updateEvent(id: number, request, eventThumbnail?: any) {
    const {
      title,
      slug,
      eventType,
      description,
      location,
      floor,
      roomNo,
      totalSeats,
      eventDate,
      startTime,
      endTime
    } = request;

    let eventExists = await this.eventRepository.findOne({
      where: { id }
    });

    if (!eventExists)
      throw new HttpException('Event not found.', HttpStatus.NOT_FOUND);

    eventExists = {
      ...eventExists,
      title,
      slug,
      eventType,
      description,
      eventThumbnail,
      location,
      floor,
      roomNo,
      totalSeats,
      eventDate,
      startTime,
      endTime
    };

    const event = await this.eventRepository.save(eventExists);

    return {
      statusCode: HttpStatus.OK,
      message: 'Event updated successfully.',
      event
    };
  }

  async deleteEvent(id: number) {
    await this.eventRepository.delete({ id });

    return {
      statusCode: HttpStatus.OK,
      message: 'Event deleted successfully.'
    };
  }

  async registerToEvent(slug: string, userId: number) {
    // const user = await this.userRepository.findOne({
    //   where: { id: userId }
    // });
    // if (!user) {
    //   console.log(`User with ID ${userId} not found.`);
    //   throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    // }

    const event: Events = await this.eventRepository.findOne({
      where: { slug }
    });
    if (!event) {
      console.log(`Event with slug ${slug} not found.`);
      throw new HttpException('Event not found.', HttpStatus.NOT_FOUND);
    }
    const isRegistered = await this.eventParticipantsRepo.findOne({
      where: {
        event: { id: event.id },
        user: { id: userId }
      }
    });

    if (isRegistered) {
      console.log(`User is already registered for the event.`);
      throw new HttpException(
        'User is already registered for the event.',
        HttpStatus.CONFLICT
      );
    }

    // event?.users?.push(user);
    // console.log(`Adding user ${user.id} to event ${event.id}`);
    // console.log(`Current event users: ${JSON.stringify(event.users)}`);
    await this.eventParticipantsRepo.save({
      event,
      user: { id: userId }
    });
    // await this.eventRepository.save(event);

    return {
      statusCode: HttpStatus.OK,
      message: 'User registered for the event successfully.'
    };
  }

  async unRegisterFromEvent(slug: string, userId: number) {
    // TODO: user unregistration
  }
  async registerValorant() {}

  async ideathonRegister(
    details: ideathonTeam,
    userId: number,
    paymentPath: string
  ) {
    const alreadyRegistered = await this.IdeathonEntiy.findOne({
      where: { teamLeader: { id: userId } }
    });
    if (alreadyRegistered) {
      throw new HttpException(
        'User is already registered for the event.',
        HttpStatus.CONFLICT
      );
    }
    console.log(details);
    const ideathonRegister = await IdeathonEntiy.save({
      teamLeader: { id: userId },
      paymentPhoto: paymentPath,
      paymentStatus: false,
      ...details
    });
    await this.mailService.sendOrganizerEmail(
      'ideathon Registration',
      ideathonRegister
    );
    return ideathonRegister;
  }
}
