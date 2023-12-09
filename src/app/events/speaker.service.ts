import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Speaker } from './models/Speaker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpeakerService {
  constructor(
    @InjectRepository(Speaker)
    private speakerRepository: Repository<Speaker>
  ) {}

  async getSpeakers() {
    const speakers = await this.speakerRepository.find({
      relations: { event: true }
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'List of speakers.',
      speakers
    };
  }

  async getSpeaker(id: number) {
    const speaker = await this.speakerRepository.findOne({
      where: { id },
      relations: { event: true }
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Speaker details fetched successfully.',
      speaker
    };
  }

  async createSpeaker(request, imageUrl) {
    const { name, bio, companyName, linkedInUrl, twitterUrl } = request;

    const speaker = await this.speakerRepository.save({
      name,
      bio,
      companyName,
      linkedInUrl,
      image: imageUrl,
      twitterUrl
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'New speaker added successfully.',
      speaker
    };
  }

  async updateSpeaker(id: number, request, imageUrl) {
    const { name, bio, companyName, linkedInURL, twitterURL } = request;

    let speakerExists = await this.speakerRepository.findOne({
      where: { id }
    });

    if (!speakerExists)
      throw new HttpException('Speaker not found.', HttpStatus.NOT_FOUND);

    speakerExists = {
      ...speakerExists,
      name,
      bio,
      image: imageUrl,
      companyName,
      linkedInURL,
      twitterURL
    };

    const speaker = await this.speakerRepository.save(speakerExists);

    return {
      statusCode: HttpStatus.OK,
      message: 'Speaker updated successfully.',
      speaker
    };
  }

  async deleteSpeaker(id: number) {
    await this.speakerRepository.delete({ id });

    return {
      statusCode: HttpStatus.OK,
      message: 'Speaker deleted successfully.'
    };
  }
}
