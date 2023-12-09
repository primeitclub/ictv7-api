import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SpeakerService } from './speaker.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@ApiTags('Speaker')
@Controller('speakers')
export class SpeakerController {
  constructor(private speakerService: SpeakerService) {}

  @Get()
  async handleGetAllSpeakers() {
    return this.speakerService.getSpeakers();
  }

  @Get('/:id')
  async handleGetSpeaker(@Param('id') id: number) {
    return this.speakerService.getSpeaker(id);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      title: 'createSpeakerDTO',
      required: ['name', 'bio', 'image'],
      properties: {
        name: {
          type: 'string'
        },
        bio: {
          type: 'string'
        },
        companyName: {
          type: 'string'
        },
        image: {
          type: 'string',
          format: 'binary'
        },
        linkedInURL: {
          type: 'string'
        },
        twitterURL: {
          type: 'string'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async handleCreateSpeaker(
    @UploadedFile() imageUrl: Express.Multer.File,
    @Body() request
  ) {
    return this.speakerService.createSpeaker(request, imageUrl.path);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      title: 'updateSpeakerDTO',
      properties: {
        name: {
          type: 'string'
        },
        bio: {
          type: 'string'
        },
        companyName: {
          type: 'string'
        },
        image: {
          type: 'string',
          format: 'binary'
        },
        linkedInURL: {
          type: 'string'
        },
        twitterURL: {
          type: 'string'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('image'))
  @Put('/:id')
  async handleUpdateSpeaker(
    @UploadedFile() imageUrl: Express.Multer.File,
    @Param('id') id: number,
    @Body() request
  ) {
    return this.speakerService.updateSpeaker(id, request, imageUrl.path);
  }

  @Delete('/:id')
  async handleDeleteSpeaker(@Param('id') id: number) {
    return this.speakerService.deleteSpeaker(id);
  }
}
