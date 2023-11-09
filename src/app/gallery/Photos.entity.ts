import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne
} from 'typeorm';
import { User } from '../user/model/User.entity';

@Entity()
export class Photos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar', name: 'company_name' })
  companyName: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar', name: 'fb_profile' })
  fbProfile: string;

  @Column({ type: 'varchar', name: 'insta_profile' })
  instaProfile: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
