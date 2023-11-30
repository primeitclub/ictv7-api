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

  @UseGuards(JwtAuthGuard)
  @Get()
  async handleGetAllSpeakers() {
    return this.speakerService.getSpeakers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async handleGetSpeaker(@Param('id') id: string) {
    return this.speakerService.getSpeaker(id);
  }

  @UseGuards(JwtAuthGuard)
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
    console.log(imageUrl);
    console.log(request);

    return this.speakerService.createSpeaker(request, imageUrl);
  }

  @UseGuards(JwtAuthGuard)
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
    @Param('id') id: string,
    @Body() request
  ) {
    return this.speakerService.updateSpeaker(id, request, imageUrl);
  }

  @Delete('/:id')
  async handleDeleteSpeaker(@Param('id') id: string) {
    return this.speakerService.deleteSpeaker(id);
  }
}
