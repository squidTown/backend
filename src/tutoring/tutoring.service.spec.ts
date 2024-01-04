import { Test, TestingModule } from '@nestjs/testing';
import { TutoringService } from './tutoring.service';

describe('TutoringService', () => {
  let service: TutoringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutoringService],
    }).compile();

    service = module.get<TutoringService>(TutoringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
