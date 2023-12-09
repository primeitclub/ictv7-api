import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Events } from './Events.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Speaker {
  @PrimaryColumn(uuidv4())
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
