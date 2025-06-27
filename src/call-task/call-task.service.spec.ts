import { Test, TestingModule } from '@nestjs/testing';
import { CallTaskService } from './call-task.service';

describe('CallTaskService', () => {
  let service: CallTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallTaskService],
    }).compile();

    service = module.get<CallTaskService>(CallTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
