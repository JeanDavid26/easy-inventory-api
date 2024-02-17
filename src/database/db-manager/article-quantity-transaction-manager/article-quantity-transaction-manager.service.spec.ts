import { Test, TestingModule } from '@nestjs/testing';
import { ArticleQuantityTransactionManagerService } from './article-quantity-transaction-manager.service';

describe('ArticleQuantityTransactionManagerService', () => {
  let service: ArticleQuantityTransactionManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleQuantityTransactionManagerService],
    }).compile();

    service = module.get<ArticleQuantityTransactionManagerService>(
      ArticleQuantityTransactionManagerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
