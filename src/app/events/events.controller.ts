import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsPublic } from 'src/utils/decorator';
import { EventDTO, ideathonTeam } from './events.dto';

@ApiBearerAuth()
@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @IsPublic()
  @Get()
  async handleGetAllEvents() {
    return await this.eventsService.getAllEvents();
  }

  @Post('/ideathon/register')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('payment'))
  async ideathon(
    @Body() body: ideathonTeam,
    @Req() req,
    @UploadedFile() eventThumbnail: Express.Multer.File
  ) {
    return await this.eventsService.ideathonRegister(
      body,
      req.user.id,
      eventThumbnail.path
    );
  }

  @IsPublic()
  @Get('/:id')
  async handleGetEvent(@Param('id') id: string) {
    return await this.eventsService.getEvent(id);
  }

  //   @Post('/valorant/register')
  //   @UseInterceptors(FileInterceptor('logo'))
  //   @ApiConsumes('multipart/form-data')
  //   async registerValorant(
  //     @Req() req,
  //     @UploadedFile() logo: Express.Multer.File,
  //     @Body() teamDeatils
  //   ) {
  //     return await this.eventsService.registerValorant();
  //   }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      title: 'createEventDTO',
      required: [
        'title',
        'slug',
        'eventType',
        'eventThumbnail',
        'description',
        'location',
        'floor',
        'roomNo'
      ],
      properties: {
        title: {
          type: 'string'
        },
        slug: {
          type: 'string'
        },
        eventType: {
          type: 'string'
        },
        eventThumbnail: {
          type: 'string',
          format: 'binary'
        },
        description: {
          type: 'string'
        },
        location: {
          type: 'string'
        },
        floor: {
          type: 'string'
        },
        roomNo: {
          type: 'string'
        },
        totalSeats: {
          type: 'number'
        },
        eventDate: {
          type: 'string'
        },
        startTime: {
          type: 'string'
        },
        endTime: {
          type: 'string'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('eventThumbnail'))
  @Post()
  async handleCreateEvent(
    @UploadedFile() eventThumbnail: Express.Multer.File,
    @Body() requestBody: EventDTO
  ) {
    return await this.eventsService.createEvent(
      requestBody,
      eventThumbnail.path
    );
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      title: 'updateEventDTO',
      properties: {
        title: {
          type: 'string'
        },
        slug: {
          type: 'string'
        },
        eventType: {
          type: 'string'
        },
        eventThumbnail: {
          type: 'string',
          format: 'binary'
        },
        description: {
          type: 'string'
        },
        location: {
          type: 'string'
        },
        floor: {
          type: 'string'
        },
        roomNo: {
          type: 'string'
        },
        totalSeats: {
          type: 'number'
        },
        eventDate: {
          type: 'string'
        },
        startTime: {
          type: 'string'
        },
        endTime: {
          type: 'string'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('eventThumbnail'))
  @Put('/:id')
  async handleUpdateEvent(
    @Param('id') id: string,
    @Body() requestBody,
    @UploadedFile() eventThumbnail: Express.Multer.File
  ) {
    return await this.eventsService.updateEvent(
      id,
      requestBody,
      eventThumbnail.path
    );
  }

  @Delete('/:id')
  async handleDeleteEvent(@Param('id') id: string) {
    return await this.eventsService.deleteEvent(id);
  }

  @Post('/:slug/register')
  async handleRegisterToEvent(@Req() req, @Param('slug') slug: string) {
    return await this.eventsService.registerToEvent(slug, req.user.id);
  }

  @Delete('/:slug/unregister')
  async handleUnRegisterFromEvent(@Req() req, @Param('slug') slug: string) {
    return await this.eventsService.unRegisterFromEvent(slug, req.user.id);
  }

  //   @Post('/valorant/register')
  //   @UseInterceptors(
  //     FileInterceptor('eventThumbnail'),
  //     FileInterceptor('idCard'),
  //     FileInterceptor('valorantIdCard')
  //   )
  //   @ApiConsumes('multipart/form-data')
  //   async registerValorant(
  //     @Req() req,
  //     @UploadedFile() eventThumbnail: Express.Multer.File
  //   ) {
  //     return await this.eventsService.registerValorant(req.user.id);
  //   }
}
