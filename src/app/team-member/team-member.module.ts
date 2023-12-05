import { Module } from '@nestjs/common';
import { TeamMemberService } from './team-member.service';
import { TeamMemberController } from './team-member.controller';

@Module({
  providers: [TeamMemberService],
  controllers: [TeamMemberController]
})
export class TeamMemberModule {}
