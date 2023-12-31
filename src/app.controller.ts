import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

// demo
export class demoDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString({ message: 'Message must be string' })
  message: string;
}
@ApiTags('App')
@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/demo')
  async demo(@Body() body: demoDTO): Promise<any> {
    return { body };
  }
}
