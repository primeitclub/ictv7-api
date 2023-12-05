import { Module } from '@nestjs/common';
import { TeamMemberService } from './team-member.service';
import { TeamMemberController } from './team-member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMember } from './TeamMember.entity';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamMember]),
    MulterModule.register(multerConfig)
  ],
  providers: [TeamMemberService],
  controllers: [TeamMemberController]
})
export class TeamMemberModule {}
