import { Test, TestingModule } from '@nestjs/testing';
import { SuggestedTaskService } from './suggested-task.service';

describe('SuggestedTaskService', () => {
  let service: SuggestedTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuggestedTaskService],
    }).compile();

    service = module.get<SuggestedTaskService>(SuggestedTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
