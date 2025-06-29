import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { CallRecordService } from './call-record.service';
import { CreateCallRecordDto } from './dto/create-call-record.dto';
import { AssignTagsDto, UpdateCallRecordDto } from './dto/update-call-record.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CallRecord } from './entities/call-record.entity';

@Controller('call-records')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CallRecordController {
  constructor(private callRecordService: CallRecordService) { }

  @Post()
  async create(@Body() createCallRecordDto: CreateCallRecordDto, @Request() req): Promise<CallRecord> {
    const userId = req.user?.sub || createCallRecordDto.assignedUserId;
    const dtoWithUser = { ...createCallRecordDto, assignedUserId: userId };
    return this.callRecordService.create(dtoWithUser);
  }

  @Get()
  async findAll(
    @Request() req,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('status') status?: string
  ) {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    return this.callRecordService.findAll(parsedPage, parsedLimit, status);
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