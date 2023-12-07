import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { FileUploadProvider } from './file-upload.provider';

@Module({
  imports: [],
  controllers: [FileUploadController],
  providers: [FileUploadService, FileUploadProvider]
})
export class FileUploadModule {}
