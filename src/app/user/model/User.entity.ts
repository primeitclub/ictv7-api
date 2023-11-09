import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne
} from 'typeorm';
import { UserType } from '../enums/user.enum';
import { EsportsTeam } from './EsportsTeam.model';
import { Event } from './Event.model'; // Import the EventDetails entity
import { OTP } from './Otp.entity';
import { Photos } from './Photos.model';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.user })
  user_type: UserType;

  @Column({ type: 'varchar' })
  college_name: string;

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

  @OneToOne(() => Photos, (photo) => photo.user)
  @JoinColumn({ name: 'user_id' })
  photograph: Photos;
}
