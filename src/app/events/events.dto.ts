import { ApiProperty } from '@nestjs/swagger';

export class teamsData {
  @ApiProperty()
  teamName: string;
  @ApiProperty()
  teamLeaderName: string;
  @ApiProperty()
  teamSubName: string;
  @ApiProperty()
  teamLogo: string;
}
export enum sdgGoal {
  SDG4 = 'SDG4',
  SDG6 = 'SDG6',
  SDG7 = 'SDG7',
  SDG11 = 'SDG11',
  SDG13 = 'SDG13'
}

export class ideathonTeam {
  @ApiProperty()
  teamName: string;
  @ApiProperty()
  teamMembers: string;

  @ApiProperty()
  teamLeaderName: string;
  @ApiProperty({ enum: sdgGoal })
  sdgGoal: sdgGoal;

  @ApiProperty()
  ideaName: string;

  @ApiProperty()
  ideaDescription: string;

  @ApiProperty()
  ideaImpact: string;
}
