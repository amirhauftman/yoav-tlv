import { Test, TestingModule } from '@nestjs/testing';
import { CallTaskController } from './call-task.controller';
import { CallTaskService } from './call-task.service';

describe('CallTaskController', () => {
  let controller: CallTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallTaskController],
      providers: [CallTaskService],
    }).compile();

    controller = module.get<CallTaskController>(CallTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
