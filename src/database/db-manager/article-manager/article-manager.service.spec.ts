import { Test, TestingModule } from '@nestjs/testing';
import { ArticleManagerService } from './article-manager.service';

describe('ArticleManagerService', () => {
  let service: ArticleManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleManagerService],
    }).compile();

    service = module.get<ArticleManagerService>(ArticleManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
