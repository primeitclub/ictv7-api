import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EsportsTeam } from './EsportsTeam.model';

@Entity()
export class EsportesGame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'game_name' })
  gameName: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  image: string;

  @OneToMany(() => EsportsTeam, (team) => team.game)
  teams: EsportsTeam[];
}
