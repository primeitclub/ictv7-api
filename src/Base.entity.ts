import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default abstract class Base extends BaseEntity {
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
