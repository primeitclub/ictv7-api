import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Speaker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  company_name: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar' })
  linkedin_profile: string;

  @Column({ type: 'varchar' })
  twitter_profile: string;
}
