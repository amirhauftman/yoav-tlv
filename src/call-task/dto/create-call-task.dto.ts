import { IsString, IsOptional, IsEnum, IsArray, IsUUID } from 'class-validator';
import { TaskStatus } from '../entities/call-task.entity';

export class CreateCallTaskDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsString()
  callRecordId: string;

  @IsOptional()
  @IsString()
  suggestedTaskId?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  tagIds?: string[];
}