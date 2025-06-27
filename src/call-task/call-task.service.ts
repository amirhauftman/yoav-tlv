import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallTask } from './entities/call-task.entity';
import { CreateCallTaskDto } from './dto/create-call-task.dto';
import { UpdateCallTaskDto, UpdateTaskStatusDto } from './dto/update-call-task.dto';

@Injectable()
export class CallTaskService {
  constructor(
    @InjectRepository(CallTask)
    private callTaskRepository: Repository<CallTask>,
  ) {}

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
    Object.assign(callTask, updateCallTaskDto);
    return this.callTaskRepository.save(callTask);
  }

  async updateStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Promise<CallTask> {
    const callTask = await this.findOne(id);
    callTask.status = updateTaskStatusDto.status;
    return this.callTaskRepository.save(callTask);
  }

  async remove(id: string): Promise<void> {
    const callTask = await this.findOne(id);
    await this.callTaskRepository.remove(callTask);
  }
}