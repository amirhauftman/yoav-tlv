import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { CallRecord } from 'src/call-record/entities/call-record.entity';
import { SuggestedTask } from 'src/suggested-task/entities/suggested-task.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Many-to-many relationship with CallRecords
  @ManyToMany(() => CallRecord, callRecord => callRecord.tags)
  callRecords: CallRecord[];

  // One-to-many relationship with SuggestedTasks (BONUS)
  @OneToMany(() => SuggestedTask, suggestedTask => suggestedTask.tag)
  suggestedTasks: SuggestedTask[];
}