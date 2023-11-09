import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  JoinTable,
  ManyToMany
} from 'typeorm';
// import { Speaker } from './Speaker.model';
import { User } from '../../user/model/User.entity';
import { Speaker } from './Speaker.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  location: string;

  @Column({ type: 'varchar' })
  room_no: string;

  @Column({ type: 'varchar' })
  floor: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'enum', enum: ['workshop', 'session', 'panel discussion'] })
  event_type: 'workshop' | 'session' | 'panel discussion';

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @ManyToOne(() => Speaker)
  @JoinColumn({ name: 'speaker_id' })
  speaker: Speaker;

  @ManyToMany(() => User, (user) => user.events)
  @JoinTable({
    name: 'user_events',
    joinColumn: { name: 'event_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }
  })
  users: User[];
}
