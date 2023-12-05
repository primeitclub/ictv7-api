import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamMember } from './TeamMember.entity';
import { Repository } from 'typeorm';
import isValidUUID from 'src/utils/checkUUID.util';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectRepository(TeamMember)
    private teamMemberRepository: Repository<TeamMember>
  ) {}
  async getMembers() {
    const teamMembers = await this.teamMemberRepository.find();

    const groupedTeamMembers = teamMembers.reduce(
      (groupedMembers, teamMember) => {
        const { memberType, ...otherFields } = teamMember;

        if (!groupedMembers[memberType]) {
          groupedMembers[memberType] = [];
        }

        groupedMembers[memberType].push(otherFields);

        return groupedMembers;
      },
      {}
    );

    return {
      message: 'List of team members.',
      groupedTeamMembers
    };
  }

  async addMember(request, image: string) {
    const newMember = await this.teamMemberRepository.save({
      ...request,
      image
    });

    return {
      message: 'Team member added successfully.',
      newMember
    };
  }

  async updateMember(id: string, request, image: string) {
    const { fullName, memberType } = request;

    if (!isValidUUID(id))
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);

    let teamMemberExists = await this.teamMemberRepository.findOne({
      where: { id }
    });

    if (!teamMemberExists)
      throw new HttpException('Team member not found.', HttpStatus.NOT_FOUND);

    teamMemberExists = {
      ...teamMemberExists,
      fullName,
      memberType,
      image
    };

    const updatedTeamMember =
      await this.teamMemberRepository.save(teamMemberExists);

    return {
      message: 'Team member updated successfully.',
      updatedTeamMember
    };
  }

  async deleteMember(id: string) {
    if (!isValidUUID(id))
      throw new HttpException('Invalid id.', HttpStatus.BAD_REQUEST);

    await this.teamMemberRepository.delete(id);

    return { message: 'Team member deleted successfully.' };
  }
}
