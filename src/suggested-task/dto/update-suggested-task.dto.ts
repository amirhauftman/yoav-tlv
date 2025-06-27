import { PartialType } from '@nestjs/mapped-types';
import { CreateSuggestedTaskDto } from './create-suggested-task.dto';
import { IsString, IsOptional, IsUUID } from 'class-validator';


export class UpdateSuggestedTaskDto extends PartialType(CreateSuggestedTaskDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  @IsOptional()
  tagId?: string;
}


