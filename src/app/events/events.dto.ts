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

  @ApiProperty({ enum: sdgGoal })
  sdgGoal: sdgGoal;

  @ApiProperty()
  collegeName: string;

  @ApiProperty()
  ideaName: string;

  @ApiProperty()
  ideaDescription: string;

  @ApiProperty()
  TeamMembers: string;
}
export class EventDTO {
  title: string;
  slug: string;
  eventType: string;
  description: string;
  location: string;
  floor: string;
  roomNo: string;
  totalSeats: number;
  eventDate: string; // You might want to use a Date type if you need to perform date-related operations
  startTime: string; // You might want to use a Time type or a Date type with specific time information
  endTime: string; // Same as startTime
}
