import { Test, TestingModule } from '@nestjs/testing';
import { SuggestedTaskController } from './suggested-task.controller';
import { SuggestedTaskService } from './suggested-task.service';

describe('SuggestedTaskController', () => {
  let controller: SuggestedTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuggestedTaskController],
      providers: [SuggestedTaskService],
    }).compile();

    controller = module.get<SuggestedTaskController>(SuggestedTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
