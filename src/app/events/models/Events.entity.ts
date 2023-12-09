import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from '../../user/model/User.entity';
import { Speaker } from './Speaker.entity';
import { EventType } from '../events.enum';

@Entity('events')
export class Events {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', unique: true })
  slug: string;

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

  @Column({ type: 'integer' })
  totalSeats: number;

  @Column({ nullable: true, type: 'jsonb' })
  eventDate: [];

  @Column({ nullable: true, type: 'jsonb' })
  startTime: [];

  @Column({ nullable: true, type: 'jsonb' })
  endTime: [];

  @OneToMany(() => Speaker, (speaker) => speaker.event)
  speakers: Speaker[];

  //   @ManyToMany(() => User, (user) => user.events)
  //   @JoinTable({
  //     name: 'user_events',
  //     joinColumn: { name: 'event_id', referencedColumnName: 'id' },
  //     inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }
  //   })
  //   users: User[];
  @OneToMany(
    () => EventParticipants,
    (eventParticipants) => eventParticipants.event
  )
  users: EventParticipants[];
}

@Entity('EventParticipants')
export class EventParticipants {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Events, (event) => event.users)
  @JoinColumn({ name: 'event_id' })
  event: Events;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
