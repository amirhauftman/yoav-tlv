import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Tag } from 'src/tag/entities/tag.entity';
import { CallTask } from 'src/call-task/entities/call-task.entity';

@Entity('suggested_tasks')
export class SuggestedTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Many-to-one relationship with Tag
  @ManyToOne(() => Tag, tag => tag.suggestedTasks, { onDelete: 'CASCADE' })
  tag: Tag;

  @Column()
  tagId: string;

  // One-to-many relationship with CallTasks (when users assign this suggested task)
  @OneToMany(() => CallTask, callTask => callTask.suggestedTask)
  callTasks: CallTask[];
}