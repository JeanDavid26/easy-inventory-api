import { Test, TestingModule } from '@nestjs/testing';
import { CategoryManagerService } from './category-manager.service';

describe('CategoryManagerService', () => {
  let service: CategoryManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryManagerService],
    }).compile();

    service = module.get<CategoryManagerService>(CategoryManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
