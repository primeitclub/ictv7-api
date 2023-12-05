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
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { createGalleryDTO, updateGalleryDTO } from './gallery.dto';
import { GalleryService } from './gallery.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  @UseGuards(JwtAuthGuard)
  @Get('albums')
  async handleGetAlbums() {
    return this.galleryService.getAlbums();
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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
    @Param('id') id: string,
    @Req() request: updateGalleryDTO,
    @UploadedFile() thumbnail: Express.Multer.File
  ) {
    return this.galleryService.updateAlbum(id, request, thumbnail.path);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('albums/:id')
  async handleDeleteAlbum(@Param('id') id: string) {
    return this.galleryService.deleteAlbum(id);
  }

  @UseGuards(JwtAuthGuard)
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
  @UseInterceptors(FileInterceptor('thumbnail'))
  @Post('albums/:slug/photos')
  async handlePhotoUpload(
    @Param('slug') slug: string,
    @UploadedFile() photo: Express.Multer.File
  ) {
    return this.galleryService.uploadPhoto(slug, photo.path);
  }
}
