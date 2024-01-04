import { Test, TestingModule } from '@nestjs/testing';
import { TutoringController } from './tutoring.controller';
import { TutoringService } from './tutoring.service';

describe('TutoringController', () => {
  let controller: TutoringController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutoringController],
      providers: [TutoringService],
    }).compile();

    controller = module.get<TutoringController>(TutoringController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
