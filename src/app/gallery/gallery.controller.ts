import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { createGalleryDTO, updateGalleryDTO } from './gallery.dto';
import { GalleryService } from './gallery.service';

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
  @Post('albums')
  async handleCreateAlbum(@Req() request: createGalleryDTO) {
    return this.galleryService.createAlbum(request);
  }

  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @Put('albums/:id')
  async handleUpdateAlbum(
    @Param('id') id: string,
    @Req() request: updateGalleryDTO
  ) {
    return this.galleryService.updateAlbum(id, request);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('albums/:id')
  async handleDeleteAlbum(@Param('id') id: string) {
    return this.galleryService.deleteAlbum(id);
  }
}
