import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { createGalleryDTO, updateGalleryDTO } from './gallery.dto';
import { GalleryService } from './gallery.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsPublic } from 'src/utils/decorator';

@ApiBearerAuth()
@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}
  @IsPublic()
  @Get('albums')
  async handleGetAlbums() {
    return this.galleryService.getAlbums();
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      title: 'createAlbumDTO',
      required: ['title', 'slug', 'thumbnail'],
      properties: {
        title: {
          type: 'string'
        },
        slug: {
          type: 'string'
        },
        thumbnail: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('thumbnail'))
  @Post('albums')
  async handleCreateAlbum(
    @Body() request: createGalleryDTO,
    @UploadedFile() thumbnail: Express.Multer.File
  ) {
    console.log(thumbnail);
    return this.galleryService.createAlbum(request, thumbnail.path);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      title: 'updateAlbumDTO',
      required: ['title', 'slug', 'thumbnail'],
      properties: {
        title: {
          type: 'string'
        },
        slug: {
          type: 'string'
        },
        thumbnail: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('thumbnail'))
  @Put('albums/:id')
  async handleUpdateAlbum(
    @Param('id') id: number,
    @Req() request: updateGalleryDTO,
    @UploadedFile() thumbnail: Express.Multer.File
  ) {
    return this.galleryService.updateAlbum(id, request, thumbnail.path);
  }

  @Delete('albums/:id')
  async handleDeleteAlbum(@Param('id') id: number) {
    return this.galleryService.deleteAlbum(id);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      title: 'uploadPhotoDTO',
      required: ['photo'],
      properties: {
        photo: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('photo'))
  @Post('albums/:slug/photos')
  async handlePhotoUpload(
    @Param('slug') slug: string,
    @UploadedFile() photo: Express.Multer.File
  ) {
    return this.galleryService.uploadPhoto(slug, photo.path);
  }
}
