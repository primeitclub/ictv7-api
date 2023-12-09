import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { EsportsTeam } from './EsportsTeam.entity';
import Base from 'src/Base.entity';

@Entity({ name: 'EsportsTeamsMember' })
export class EsportsTeamMember extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  image: string;

  @ManyToOne(() => EsportsTeam, (game) => game.teamMember)
  @JoinColumn({ name: 'game_id' })
  team: EsportsTeam;
}
