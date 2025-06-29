import { PartialType } from '@nestjs/mapped-types';
import { CreateCallRecordDto } from './create-call-record.dto';
import { IsString, IsOptional, IsUUID, IsArray, IsEnum } from 'class-validator';
import { CallStatus } from '../entities/call-record.entity';

export class UpdateCallRecordDto extends PartialType(CreateCallRecordDto) {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(CallStatus)
  @IsOptional()
  status?: CallStatus;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  tagIds?: string[];

  @IsUUID()
  @IsOptional()
  assignedUserId?: string;
}
export class AssignTagsDto {
  @IsArray()
  @IsUUID('4', { each: true })
  tagIds: string[];
}
