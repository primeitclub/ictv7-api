import { User } from 'src/app/user/model/User.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class IdeathonEntiy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teamName: string;

  @OneToOne(() => User, (user) => user.ideathonTeam)
  @JoinColumn({ name: 'teamLeaderId' })
  teamLeader: User;

  @Column()
  sdgGoal: string;

  @Column()
  ideaName: string;

  @Column()
  ideaDescription: string;

  @Column()
  ideaImpact: string;
}
