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
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async handleGetAllEvents() {
    return await this.eventsService.getAllEvents();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async handleGetEvent(@Param('id') id: string) {
    return await this.eventsService.getEvent(id);
  }

  @UseGuards(JwtAuthGuard)
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
    @Body() requestBody
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

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async handleDeleteEvent(@Param('id') id: string) {
    return await this.eventsService.deleteEvent(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:slug/register')
  async handleRegisterToEvent(@Req() req, @Param('slug') slug: string) {
    return await this.eventsService.registerToEvent(slug, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:slug/unregister')
  async handleUnRegisterFromEvent(@Req() req, @Param('slug') slug: string) {
    return await this.eventsService.unRegisterFromEvent(slug, req.user.id);
  }
}
