
import { IsString, IsOptional, IsEnum, IsUUID, IsArray } from 'class-validator';
import { TaskStatus } from '../entities/call-task.entity';

export class UpdateCallTaskDto /*extends PartialType(CreateCallTaskDto) */ {
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  tagIds?: string[];

}

