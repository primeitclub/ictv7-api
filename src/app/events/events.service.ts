import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Events } from './models/Events.entity';
import { InjectRepository } from '@nestjs/typeorm';
import isValidUUID from 'src/utils/checkUUID.util';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private eventRepository: Repository<Events>
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

  async getEvent(id: string) {
    if (!isValidUUID(id))
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);

    const event = await this.eventRepository.findOne({
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

  async updateEvent(id: string, request, eventThumbnail?: any) {
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

    if (!isValidUUID(id))
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);

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

  async deleteEvent(id: string) {
    if (!isValidUUID(id))
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);

    await this.eventRepository.delete({ id });

    return {
      statusCode: HttpStatus.OK,
      message: 'Event deleted successfully.'
    };
  }
}
