import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuggestedTask } from './entities/suggested-task.entity';
import { CreateSuggestedTaskDto } from './dto/create-suggested-task.dto';
import { TagService } from 'src/tag/tag.service';
import { UpdateSuggestedTaskDto } from './dto/update-suggested-task.dto';

@Injectable()
export class SuggestedTaskService {
  constructor(
    @InjectRepository(SuggestedTask)
    private suggestedTaskRepository: Repository<SuggestedTask>,
    private tagService: TagService,
  ) {}

  async create(createSuggestedTaskDto: CreateSuggestedTaskDto): Promise<SuggestedTask> {
    // Verify tag exists
    await this.tagService.findOne(createSuggestedTaskDto.tagId);

    const suggestedTask = this.suggestedTaskRepository.create(createSuggestedTaskDto);
    return this.suggestedTaskRepository.save(suggestedTask);
  }

  async findAll(): Promise<SuggestedTask[]> {
    return this.suggestedTaskRepository.find({
      relations: ['tag'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByTag(tagId: string): Promise<SuggestedTask[]> {
    return this.suggestedTaskRepository.find({
      where: { tagId },
      relations: ['tag'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<SuggestedTask> {
    const suggestedTask = await this.suggestedTaskRepository.findOne({
      where: { id },
      relations: ['tag'],
    });

    if (!suggestedTask) {
      throw new NotFoundException('Suggested task not found');
    }

    return suggestedTask;
  }

  async update(id: string, updateSuggestedTaskDto: UpdateSuggestedTaskDto): Promise<SuggestedTask> {
    const suggestedTask = await this.findOne(id);

    if (updateSuggestedTaskDto.tagId) {
      await this.tagService.findOne(updateSuggestedTaskDto.tagId);
    }

    Object.assign(suggestedTask, updateSuggestedTaskDto);
    return this.suggestedTaskRepository.save(suggestedTask);
  }

  async remove(id: string): Promise<void> {
    const suggestedTask = await this.findOne(id);
    await this.suggestedTaskRepository.remove(suggestedTask);
  }
}
