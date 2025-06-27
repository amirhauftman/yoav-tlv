import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuggestedTask } from './entities/suggested-task.entity';
import { TagModule } from 'src/tag/tag.module';
import { SuggestedTaskController } from './suggested-task.controller';
import { SuggestedTaskService } from './suggested-task.service';


@Module({
  imports: [TypeOrmModule.forFeature([SuggestedTask]), TagModule],
  controllers: [SuggestedTaskController],
  providers: [SuggestedTaskService],
  exports: [SuggestedTaskService],
})
export class SuggestedTaskModule {}