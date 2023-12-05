import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TeamMemberType } from './teamMember.enum';

@Entity({ name: 'teamMember' })
export class TeamMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  fullName: string;

  @Column({
    type: 'enum',
    enum: TeamMemberType,
    default: TeamMemberType.VOLUNTEER
  })
  memberType: TeamMemberType;

  @Column({ type: 'varchar' })
  image: string;
}
