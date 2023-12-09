import Base from 'src/Base.entity';
import { User } from 'src/app/user/model/User.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('Ideathon')
export class IdeathonEntiy extends Base {
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
  TeamMembers: string;

  @Column()
  paymentPhoto: string;

  @Column()
  paymentStatus: boolean;
}
