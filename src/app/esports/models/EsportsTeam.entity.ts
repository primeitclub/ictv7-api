import Base from 'src/Base.entity';
import { User } from 'src/app/user/model/User.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
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

  @OneToMany(() => User, (User) => User.esportsTeam)
  users: User[];

  @ManyToOne(() => EsportesGame, (game) => game.teams)
  @JoinColumn({ name: 'game_id' })
  game: EsportesGame;
}
