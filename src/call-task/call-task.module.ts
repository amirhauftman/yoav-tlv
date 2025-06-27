import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallTask } from './entities/call-task.entity';
import { CallTaskController } from './call-task.controller';
import { CallTaskService } from './call-task.service';


@Module({
  imports: [TypeOrmModule.forFeature([CallTask])],
  controllers: [CallTaskController],
  providers: [CallTaskService],
  exports: [CallTaskService],
})
export class CallTaskModule {}