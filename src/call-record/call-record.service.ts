import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CallRecord } from './entities/call-record.entity';
import { CreateCallRecordDto } from './dto/create-call-record.dto';
import { Tag } from 'src/tag/entities/tag.entity';
import { AssignTagsDto, UpdateCallRecordDto } from './dto/update-call-record.dto';

@Injectable()
export class CallRecordService {
  constructor(
    @InjectRepository(CallRecord)
    private callRecordRepository: Repository<CallRecord>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createCallRecordDto: CreateCallRecordDto): Promise<CallRecord> {
    const callRecord = this.callRecordRepository.create(createCallRecordDto);

    if (createCallRecordDto.tagIds?.length) {
      const tags = await this.tagRepository.find({
        where: { id: In(createCallRecordDto.tagIds) },
      });
      callRecord.tags = tags;
    }

    return this.callRecordRepository.save(callRecord);
  }

  async findAll(): Promise<CallRecord[]> {
    return this.callRecordRepository.find({
      relations: ['tags', 'assignedUser', 'tasks'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<CallRecord> {
    const callRecord = await this.callRecordRepository.findOne({
      where: { id },
      relations: ['tags', 'assignedUser', 'tasks', 'tasks.suggestedTask'],
    });

    if (!callRecord) {
      throw new NotFoundException('Call record not found');
    }

    return callRecord;
  }

  async update(id: string, updateCallRecordDto: UpdateCallRecordDto): Promise<CallRecord> {
    const callRecord = await this.findOne(id);

    if (updateCallRecordDto.tagIds !== undefined) {
      if (updateCallRecordDto.tagIds.length > 0) {
        const tags = await this.tagRepository.find({
          where: { id: In(updateCallRecordDto.tagIds) },
        });
        callRecord.tags = tags;
      } else {
        callRecord.tags = [];
      }
    }

    Object.assign(callRecord, updateCallRecordDto);
    return this.callRecordRepository.save(callRecord);
  }

  async assignTags(id: string, assignTagsDto: AssignTagsDto): Promise<CallRecord> {
    const callRecord = await this.findOne(id);
    const tags = await this.tagRepository.find({
      where: { id: In(assignTagsDto.tagIds) },
    });

    callRecord.tags = tags;
    return this.callRecordRepository.save(callRecord);
  }

  async remove(id: string): Promise<void> {
    const callRecord = await this.findOne(id);
    await this.callRecordRepository.remove(callRecord);
  }
}

