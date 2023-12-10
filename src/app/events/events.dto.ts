import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
  @IsNotEmpty()
  teamName: string;

  @ApiProperty({ enum: sdgGoal })
  @IsNotEmpty()
  sdgGoal: sdgGoal;

  @ApiProperty()
  @IsNotEmpty()
  collegeName: string;

  @ApiProperty()
  @IsNotEmpty()
  ideaName: string;

  @ApiProperty()
  @IsNotEmpty()
  ideaDescription: string;

  @ApiProperty()
  @IsNotEmpty()
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
