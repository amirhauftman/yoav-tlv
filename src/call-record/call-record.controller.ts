import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';


import { CallRecordService } from './call-record.service';
import { CreateCallRecordDto } from './dto/create-call-record.dto';
import { AssignTagsDto, UpdateCallRecordDto } from './dto/update-call-record.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('call-records')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CallRecordController {
  constructor(private callRecordService: CallRecordService) {}

  @Post()
  create(@Body() createCallRecordDto: CreateCallRecordDto) {
    return this.callRecordService.create(createCallRecordDto);
  }

  @Get()
  findAll() {
    return this.callRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.callRecordService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCallRecordDto: UpdateCallRecordDto) {
    return this.callRecordService.update(id, updateCallRecordDto);
  }

  @Patch(':id/tags')
  assignTags(@Param('id') id: string, @Body() assignTagsDto: AssignTagsDto) {
    return this.callRecordService.assignTags(id, assignTagsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.callRecordService.remove(id);
  }
}