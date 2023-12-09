import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { TeamMemberService } from './team-member.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsPublic } from 'src/utils/decorator';

@ApiBearerAuth()
@ApiTags('Team Members')
@Controller('team-members')
export class TeamMemberController {
  constructor(private teamMemberService: TeamMemberService) {}

  @IsPublic()
  @Get()
  @HttpCode(HttpStatus.OK)
  async handleGetMembers() {
    return this.teamMemberService.getMembers();
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      title: 'addTeamMember',
      required: ['fullName', 'memberType', 'image'],
      properties: {
        fullName: {
          type: 'string'
        },
        memberType: {
          type: 'enum'
        },
        image: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handleAddMember(
    @Body() request,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.teamMemberService.addMember(request, image.path);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      title: 'updateTeamMember',
      properties: {
        fullName: {
          type: 'string'
        },
        memberType: {
          type: 'enum'
        },
        image: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('image'))
  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async handleUpdateMember(
    @Param('id') id: number,
    @UploadedFile() image: Express.Multer.File,
    @Body() request
  ) {
    return this.teamMemberService.updateMember(id, request, image.path);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async handleDeleteMember(@Param('id') id: number) {
    return this.teamMemberService.deleteMember(id);
  }
}
