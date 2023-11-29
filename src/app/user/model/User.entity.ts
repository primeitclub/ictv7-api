import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm';
import { OTP } from './Otp.entity';
import { Event } from 'src/app/events/models/Event.entity';
import { UserType } from '../user.enum';
import { EsportsTeam } from 'src/app/esports/models/EsportsTeam.entity';
// import { Photos } from 'src/app/gallery/Photos.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: string;

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

  @ManyToOne(() => EsportsTeam, (esports) => esports.id) // Assuming EsportsTeam is another entity representing the esports team
  @JoinColumn({ name: 'esports-team-id' })
  esportsTeam: EsportsTeam;

  @ManyToMany(() => Event, (event) => event.users)
  @JoinTable({
    name: 'user_events',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'event_id', referencedColumnName: 'id' }
  })
  events: Event[];

  @OneToMany(() => OTP, (otp) => otp.user)
  otps: OTP[];
}
