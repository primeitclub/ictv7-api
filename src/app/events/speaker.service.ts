import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Speaker } from './models/Speaker.entity';
import { Repository } from 'typeorm';
import isValidUUID from 'src/utils/checkUUID.util';

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

  async getSpeaker(id: string) {
    if (!isValidUUID(id))
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);

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

  async updateSpeaker(id: string, request, imageUrl) {
    const { name, bio, companyName, linkedInURL, twitterURL } = request;

    if (!isValidUUID(id))
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);

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

  async deleteSpeaker(id: string) {
    if (!isValidUUID(id))
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);

    await this.speakerRepository.delete({ id });

    return {
      statusCode: HttpStatus.OK,
      message: 'Speaker deleted successfully.'
    };
  }
}
