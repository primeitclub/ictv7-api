import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigs } from './config/db.config';
import { importClassesFromDirectories } from './utils/fileToClassImporter';
import { EsportsModule } from './app/esports/esports.module';
import { GalleryModule } from './app/gallery/gallery.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfigs()),
    ...importClassesFromDirectories(),
    EsportsModule,
    GalleryModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
