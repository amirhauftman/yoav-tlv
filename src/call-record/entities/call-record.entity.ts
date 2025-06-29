import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { CallTask } from 'src/call-task/entities/call-task.entity';

export enum CallStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

@Entity('call_records')
export class CallRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: CallStatus,
    default: CallStatus.OPEN
  })
  status: CallStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Many-to-one relationship with User (assigned user)
  @ManyToOne(() => User, user => user.callRecords)
  assignedUser: User;

  @Column({ nullable: true })
  assignedUserId: string;

  // Many-to-many relationship with Tags
  @ManyToMany(() => Tag, tag => tag.callRecords, { cascade: true })
  @JoinTable({
    name: 'call_record_tags',
    joinColumn: { name: 'callRecordId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' }
  })
  tags: Tag[];

  // One-to-many relationship with CallTasks
  @OneToMany(() => CallTask, callTask => callTask.callRecord, { cascade: true })
  tasks: CallTask[];
}