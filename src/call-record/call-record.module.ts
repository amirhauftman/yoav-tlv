import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallRecord } from './entities/call-record.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { CallRecordController } from './call-record.controller';
import { CallRecordService } from './call-record.service';


@Module({
  imports: [TypeOrmModule.forFeature([CallRecord, Tag])],
  controllers: [CallRecordController],
  providers: [CallRecordService],
  exports: [CallRecordService],
})
export class CallRecordModule {}