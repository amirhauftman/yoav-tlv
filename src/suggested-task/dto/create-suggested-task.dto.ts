import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateSuggestedTaskDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  tagId: string;
}
