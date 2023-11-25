import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { Photos } from './Photos.entity';
import { Album } from './Album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Photos])],
  controllers: [GalleryController],
  providers: [GalleryService]
})
export class GalleryModule {}
