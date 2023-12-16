import { IsNotEmpty } from 'class-validator';

export class TeamRegistrationDto {
  @IsNotEmpty()
  teamName: string;
  @IsNotEmpty()
  teamLeaderName: string;
  @IsNotEmpty()
  teamSubName: string;

  @IsNotEmpty()
  teamMemberOneName: string;
  @IsNotEmpty()
  teamMemberTwoName: string;
  @IsNotEmpty()
  teamMemberThreeName: string;
  @IsNotEmpty()
  teamMemberFourName: string;
}
