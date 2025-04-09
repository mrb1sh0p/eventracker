import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @Column()
  type!: string;

  @Column('jsonb')
  metadata!: Record<string, any>;

  @CreateDateColumn()
  createdAt!: Date;
}
