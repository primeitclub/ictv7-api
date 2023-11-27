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
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

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
      required: ['title', 'slug', 'file'],
      properties: {
        title: {
          type: 'string'
        },
        slug: {
          type: 'string'
        },
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/thumbnails',
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4();
          const fileExtension = file.originalname.split('.').pop();
          const fileName = `${uniqueSuffix}.${fileExtension}`;
          cb(null, fileName);
        }
      })
    })
  )
  @Post('albums')
  async handleCreateAlbum(
    @UploadedFile() file: Express.Multer.File,
    @Body() request: createGalleryDTO
  ) {
    return this.galleryService.createAlbum(request, file);
  }

  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      title: 'updateAlbumDTO',
      required: ['title', 'slug', 'file'],
      properties: {
        title: {
          type: 'string'
        },
        slug: {
          type: 'string'
        },
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/thumbnails',
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4();
          const fileExtension = file.originalname.split('.').pop();
          const fileName = `${uniqueSuffix}.${fileExtension}`;
          cb(null, fileName);
        }
      })
    })
  )
  @Put('albums/:id')
  async handleUpdateAlbum(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Req() request: updateGalleryDTO
  ) {
    return this.galleryService.updateAlbum(id, request, file);
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
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/photos',
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4();
          const fileExtension = file.originalname.split('.').pop();
          const fileName = `${uniqueSuffix}.${fileExtension}`;
          cb(null, fileName);
        }
      })
    })
  )
  @Post('albums/:slug/photos')
  async handlePhotoUpload(
    @Param('slug') slug: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.galleryService.uploadPhoto(slug, file);
  }
}
