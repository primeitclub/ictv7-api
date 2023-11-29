import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  @Column({ type: 'varchar' })
  thumbnail: string;

  @Column({ type: 'varchar' })
  album: string;
}
