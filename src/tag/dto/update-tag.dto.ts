import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create-tag.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTagDto extends PartialType(CreateTagDto) {

      @IsString()
      @IsOptional()
      name?: string;



}
