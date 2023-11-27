import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './model/Album.entity';
import { Repository } from 'typeorm';
import { createGalleryDTO, updateGalleryDTO } from './gallery.dto';
import isValidUUID from 'src/utils/checkUUID.util';
import { Photos } from './model/Photos.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,

    @InjectRepository(Photos)
    private photoRepository: Repository<Photos>
  ) {}

  async getAlbums() {
    const albums = await this.albumRepository.find({
      relations: { photos: true }
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'All albums fetched successfully.',
      albums
    };
  }

  async createAlbum(request: createGalleryDTO, file: any) {
    const { slug } = request;

    const slugAlreadyInUse = await this.albumRepository.findOne({
      where: { slug }
    });

    if (slugAlreadyInUse)
      throw new HttpException('Slug is already in use.', HttpStatus.CONFLICT);

    const album = await this.albumRepository.save({
      ...request,
      thumbnail: file.path
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'New album created successfully.',
      album
    };
  }

  async updateAlbum(id: string, request: updateGalleryDTO, file: any) {
    const { title, slug } = request;
    if (!isValidUUID(id))
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);

    let albumExists = await this.albumRepository.findOne({ where: { id } });

    if (!albumExists)
      throw new HttpException('Album not found.', HttpStatus.NOT_FOUND);

    albumExists = {
      ...albumExists,
      title,
      slug,
      thumbnail: file.path
    };

    const updatedAlbum = await this.albumRepository.save(albumExists);

    return {
      statusCode: HttpStatus.OK,
      message: 'Album updated successfully.',
      updatedAlbum
    };
  }

  async deleteAlbum(id: string) {
    if (!isValidUUID(id))
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);

    const albumExists = await this.albumRepository.findOne({ where: { id } });

    if (!albumExists)
      throw new HttpException('Album not found.', HttpStatus.NOT_FOUND);

    await this.albumRepository.delete({ id });

    return {
      statusCode: HttpStatus.OK,
      message: 'Album deleted successfully.'
    };
  }

  async uploadPhoto(slug: string, file: any) {
    const albumExists = await this.albumRepository.findOne({
      where: { slug },
      relations: ['photos']
    });

    if (!albumExists)
      throw new HttpException('Album not found.', HttpStatus.NOT_FOUND);

    const photo = await this.photoRepository.save({
      photo: file.path,
      album: albumExists
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Photo uploaded successfully.',
      photo
    };
  }
}
