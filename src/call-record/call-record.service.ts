import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CallRecord } from './entities/call-record.entity';
import { CreateCallRecordDto } from './dto/create-call-record.dto';
import { Tag } from 'src/tag/entities/tag.entity';
import { AssignTagsDto, UpdateCallRecordDto } from './dto/update-call-record.dto';
import { User } from 'src/user/entities/user.entity';
import { CallStatus } from './entities/call-record.entity';

@Injectable()
export class CallRecordService {
  constructor(
    @InjectRepository(CallRecord)
    private callRecordRepository: Repository<CallRecord>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createCallRecordDto: CreateCallRecordDto): Promise<CallRecord> {
    const tags = createCallRecordDto.tagIds?.length
      ? await this.tagRepository.find({ where: { id: In(createCallRecordDto.tagIds) } })
      : [];

    const assignedUser = createCallRecordDto.assignedUserId
      ? await this.userRepository.findOneBy({ id: createCallRecordDto.assignedUserId })
      : null;

    const callRecord = new CallRecord(); // Instantiate directly to avoid DeepPartial issues
    Object.assign(callRecord, {
      ...createCallRecordDto,
      status: CallStatus.OPEN,
      tags,
      assignedUser,
    });

    return this.callRecordRepository.save(callRecord);
  }

  async findAll(page = 1, limit = 10, status?: string): Promise<{ items: CallRecord[]; total: number }> {
    console.log('hereee');

    const skip = (page - 1) * limit;

    const query = this.callRecordRepository.createQueryBuilder('callRecord')
      .leftJoinAndSelect('callRecord.tags', 'tag')
      .leftJoinAndSelect('callRecord.assignedUser', 'user')
      .leftJoinAndSelect('callRecord.tasks', 'task')
      .leftJoinAndSelect('task.suggestedTask', 'suggestedTask');

    if (status) {
      query.andWhere('callRecord.status = :status', { status });
    }

    const [items, total] = await query
      .orderBy('callRecord.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { items, total };
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
      const tags = updateCallRecordDto.tagIds.length > 0
        ? await this.tagRepository.find({ where: { id: In(updateCallRecordDto.tagIds) } })
        : [];
      callRecord.tags = tags;
    }

    if (updateCallRecordDto.assignedUserId) {
      const assignedUser = await this.userRepository.findOneBy({ id: updateCallRecordDto.assignedUserId });
      if (!assignedUser) {
        throw new NotFoundException('Assigned user not found');
      }
      callRecord.assignedUser = assignedUser;
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