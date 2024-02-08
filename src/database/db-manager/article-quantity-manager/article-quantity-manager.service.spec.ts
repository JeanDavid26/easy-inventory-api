import { Test, TestingModule } from '@nestjs/testing';
import { ArticleQuantityManagerService } from './article-quantity-manager.service';

describe('ArticleQuantityManagerService', () => {
  let service: ArticleQuantityManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleQuantityManagerService],
    }).compile();

    service = module.get<ArticleQuantityManagerService>(ArticleQuantityManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
