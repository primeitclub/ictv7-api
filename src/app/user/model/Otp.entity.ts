import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from './User.entity'; // Import the User entity

@Entity()
export class OTP {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'OTP number' })
  otpNumber: string;

  @Column({ type: 'varchar' })
  expiration: string;

  @Column({ type: 'varchar', name: 'created_at' })
  createdAt: string;

  @ManyToOne(() => User, (user) => user.otps) // Assuming you have a field named 'otps' in your User entity
  @JoinColumn({ name: 'userID' })
  user: User;
}
