import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCallTaskDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  callRecordId: string;

  @IsUUID()
  @IsOptional()
  suggestedTaskId?: string;
}



