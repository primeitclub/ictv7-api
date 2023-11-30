import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  OneToMany
} from 'typeorm';
import { User } from '../../user/model/User.entity';
import { Speaker } from './Speaker.entity';
import { EventType } from '../events.enum';

@Entity('events')
export class Events {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'enum', enum: EventType })
  eventType: EventType;

  @Column({ type: 'varchar' })
  eventThumbnail: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  location: string;

  @Column({ type: 'varchar' })
  floor: string;

  @Column({ type: 'varchar' })
  roomNo: string;

  @Column({ type: 'timestamp', array: true })
  eventDate: [];

  @Column({ type: 'timestamp', array: true })
  startTime: [];

  @Column({ type: 'timestamp', array: true })
  endTime: [];

  @OneToMany(() => Speaker, (speaker) => speaker.event)
  speakers: Speaker[];

  @ManyToMany(() => User, (user) => user.events)
  @JoinTable({
    name: 'user_events',
    joinColumn: { name: 'event_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }
  })
  users: User[];
}
