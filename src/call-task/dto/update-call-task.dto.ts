import { PartialType } from '@nestjs/mapped-types';
import { CreateCallTaskDto } from './create-call-task.dto';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { TaskStatus } from '../entities/call-task.entity';

export class UpdateCallTaskDto extends PartialType(CreateCallTaskDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;

}
