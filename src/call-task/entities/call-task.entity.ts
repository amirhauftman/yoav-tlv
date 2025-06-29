import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CallRecord } from 'src/call-record/entities/call-record.entity';
import { SuggestedTask } from 'src/suggested-task/entities/suggested-task.entity';

export enum TaskStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}

@Entity('call_tasks')
export class CallTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.OPEN
  })
  status: TaskStatus;

  @Column('simple-array', { nullable: true })
  tagIds: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Many-to-one relationship with CallRecord
  @ManyToOne(() => CallRecord, callRecord => callRecord.tasks, { onDelete: 'CASCADE' })
  callRecord: CallRecord;

  @Column()
  callRecordId: string;

  // Many-to-one relationship with SuggestedTask (BONUS - if task was created from suggestion)
  @ManyToOne(() => SuggestedTask, suggestedTask => suggestedTask.callTasks, { nullable: true })
  suggestedTask: SuggestedTask;

  @Column({ nullable: true })
  suggestedTaskId: string;
}