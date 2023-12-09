import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Events } from './Events.entity';

@Entity()
export class Speaker {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  bio: string;

  @Column({ type: 'varchar', nullable: true })
  companyName: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar', nullable: true })
  linkedInURL: string;

  @Column({ type: 'varchar', nullable: true })
  twitterURL: string;

  @ManyToOne(() => Events, (event) => event.speakers)
  @JoinColumn({ name: 'eventId' })
  event: Event;
}
