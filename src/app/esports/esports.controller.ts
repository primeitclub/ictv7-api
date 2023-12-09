import { Controller, Post } from '@nestjs/common';
import { EsportsService } from './esports.service';

@Controller('esports')
export class EsportsController {
  constructor(private readonly esportsService: EsportsService) {}

  @Post('/valorant/register')
  async registerValorant() {
    return await this.esportsService.registerValorant();
  }
}
