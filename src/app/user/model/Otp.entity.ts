import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn
} from 'typeorm';
import { User } from './User.entity'; // Import the User entity

@Entity()
export class OTP {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  otpNumber: number;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(() => User, (user) => user.otps) // Assuming you have a field named 'otps' in your User entity
  @JoinColumn({ name: 'userID' })
  user: User;
}
