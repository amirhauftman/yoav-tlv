import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallTask } from './entities/call-task.entity';
import { CreateCallTaskDto } from './dto/create-call-task.dto';
import { UpdateCallTaskDto } from './dto/update-call-task.dto';

@Injectable()
export class CallTaskService {
  private readonly logger = new Logger(CallTaskService.name);

  constructor(
    @InjectRepository(CallTask)
    private callTaskRepository: Repository<CallTask>,
  ) { }

  async create(createCallTaskDto: CreateCallTaskDto): Promise<CallTask> {
    const callTask = this.callTaskRepository.create(createCallTaskDto);
    return this.callTaskRepository.save(callTask);
  }

  async findByCallRecord(callRecordId: string): Promise<CallTask[]> {
    return this.callTaskRepository.find({
      where: { callRecordId },
      relations: ['suggestedTask'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ items: CallTask[]; total: number }> {
    try {
      const skip = (page - 1) * limit;
      const query = this.callTaskRepository.createQueryBuilder('callTask')
        .leftJoinAndSelect('callTask.suggestedTask', 'suggestedTask')
        .orderBy('callTask.createdAt', 'DESC');

      const [items, total] = await query.skip(skip).take(limit).getManyAndCount();

      this.logger.log('Call tasks fetched successfully:', {
        page,
        limit,
        total,
        itemCount: items.length,
      });

      if (!Array.isArray(items)) {
        throw new Error('Invalid query result: items is not an array');
      }

      return { items, total };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch call tasks';
      this.logger.error('Error fetching call tasks:', {
        page,
        limit,
        message: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }

  async findOne(id: string): Promise<CallTask> {
    const callTask = await this.callTaskRepository.findOne({
      where: { id },
      relations: ['callRecord', 'suggestedTask'],
    });

    if (!callTask) {
      throw new NotFoundException('Call task not found');
    }

    return callTask;
  }

  async update(id: string, updateCallTaskDto: UpdateCallTaskDto): Promise<CallTask> {
    const callTask = await this.findOne(id);
    if (updateCallTaskDto.tagIds) {
      callTask.tagIds = updateCallTaskDto.tagIds;
    }
    Object.assign(callTask, updateCallTaskDto);
    return this.callTaskRepository.save(callTask);
  }

  async updateTags(id: string, tagIds: string[]): Promise<CallTask> {
    const callTask = await this.findOne(id);
    callTask.tagIds = tagIds;
    return this.callTaskRepository.save(callTask);
  }

  async updateStatus(id: string, updateTaskStatusDto: UpdateCallTaskDto): Promise<CallTask> {
    const callTask = await this.findOne(id);
    callTask.status = updateTaskStatusDto.status;
    return this.callTaskRepository.save(callTask);
  }

  async remove(id: string): Promise<void> {
    const callTask = await this.findOne(id);
    await this.callTaskRepository.remove(callTask);
  }
}