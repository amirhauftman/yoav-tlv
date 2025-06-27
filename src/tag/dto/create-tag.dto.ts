import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateTagDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
