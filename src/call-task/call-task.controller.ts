import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCallTaskDto } from './dto/create-call-task.dto';
import { CallTaskService } from './call-task.service';
import { UpdateCallTaskDto } from './dto/update-call-task.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { TaskStatus } from './entities/call-task.entity';

@Controller('call-tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CallTaskController {
  constructor(private callTaskService: CallTaskService) { }

  @Post()
  create(@Body() createCallTaskDto: CreateCallTaskDto) {
    return this.callTaskService.create(createCallTaskDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') statusFilter?: TaskStatus,
  ) {
    return this.callTaskService.findAll(page, limit);
  }

  @Get(':callRecordId')
  findByCallRecord(@Param('callRecordId') callRecordId: string) {
    return this.callTaskService.findByCallRecord(callRecordId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.callTaskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCallTaskDto: UpdateCallTaskDto) {
    return this.callTaskService.update(id, updateCallTaskDto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateCallTaskDto) {
    return this.callTaskService.updateStatus(id, updateTaskStatusDto);
  }

  @Patch(':id/tags')
  updateTags(@Param('id') id: string, @Body() updateTagDto: { tagIds: string[] }) {
    return this.callTaskService.updateTags(id, updateTagDto.tagIds);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.callTaskService.remove(id);
  }
}