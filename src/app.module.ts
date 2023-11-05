import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigs } from './config/db.config';
import { importClassesFromDirectories } from './utils/fileToClassImporter';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfigs()),
    ...importClassesFromDirectories()
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
