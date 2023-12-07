import Base from 'src/Base.entity';
import { User } from 'src/app/user/model/User.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne
} from 'typeorm';
import { EsportesGame } from './Esports.entity';

@Entity({ name: 'esports-teams' })
export class EsportsTeam extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  image: string;

  @OneToOne(() => User, (User) => User.esportsTeam)
  @JoinColumn({ name: 'captain_id' })
  user: User;

  @ManyToOne(() => EsportesGame, (game) => game.teams)
  @JoinColumn({ name: 'game_id' })
  game: EsportesGame;
}
