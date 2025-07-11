import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CallRecord } from 'src/call-record/entities/call-record.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; 
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => CallRecord, callRecord => callRecord.assignedUser)
  callRecords: CallRecord[];
}
