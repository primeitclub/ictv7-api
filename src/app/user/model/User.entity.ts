import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne
} from 'typeorm';
import { OTP } from './Otp.entity';
import { EventParticipants } from 'src/app/events/models/Events.entity';
import { UserType } from '../user.enum';
import { EsportsTeam } from 'src/app/esports/models/EsportsTeam.entity';
import { IdeathonEntiy } from 'src/app/events/models/Competition.entity';
// import { Photos } from 'src/app/gallery/Photos.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false
  })
  username: string;

  @Column({
    type: 'varchar',
    unique: true
  })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.user })
  user_type: UserType;

  @Column({ type: 'varchar', nullable: true })
  college_name: string;

  @Column({ type: 'boolean' })
  verified: boolean;

  @OneToOne(() => EsportsTeam, (esports) => esports.id) // Assuming EsportsTeam is another entity representing the esports team
  esportsTeam: EsportsTeam;

  @OneToOne(() => IdeathonEntiy, (ideathon) => ideathon.teamLeader) // Assuming EsportsTeam is another entity representing the esports team
  ideathonTeam: IdeathonEntiy;

  //   @ManyToMany(() => Events, (event) => event.users)
  //   @JoinTable({
  //     name: 'user_events',
  //     joinColumn: { name: 'user_id', referencedColumnName: 'id' },
  //     inverseJoinColumn: { name: 'event_id', referencedColumnName: 'id' }
  //   })
  //   events: Event[];

  @OneToMany(() => OTP, (otp) => otp.user)
  otps: OTP[];

  @OneToMany(() => EventParticipants, (event) => event.user)
  events: EventParticipants[];
}
