import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigs } from './config/db.config';
import { EsportsModule } from './app/esports/esports.module';
import { GalleryModule } from './app/gallery/gallery.module';
import { EventsModule } from './app/events/events.module';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfigs()),
    EventsModule,
    UserModule,
    EsportsModule,
    GalleryModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
