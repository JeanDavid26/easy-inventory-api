import { Test, TestingModule } from '@nestjs/testing';
import { DocumentManagerService } from './document-manager.service';

describe('DocumentManagerService', () => {
  let service: DocumentManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentManagerService],
    }).compile();

    service = module.get<DocumentManagerService>(DocumentManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
