import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EsportsTeam } from './models/EsportsTeam.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EsportsService {
  constructor(
    @InjectRepository(EsportsTeam)
    private esportsTeamRepository: Repository<EsportsTeam>
  ) {}
  async registerValorant() {}
}
