import { IsString, IsOptional, IsUUID, IsArray } from 'class-validator';

export class CreateCallRecordDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  callerName?: string;

  @IsString()
  @IsOptional()
  callerPhone?: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  tagIds?: string[];

  @IsUUID()
  @IsOptional()
  assignedUserId?: string;
}

