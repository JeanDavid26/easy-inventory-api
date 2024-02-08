import { Test, TestingModule } from '@nestjs/testing';
import { TransactionManagerService } from './transaction-manager.service';

describe('TransactionManagerService', () => {
  let service: TransactionManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionManagerService],
    }).compile();

    service = module.get<TransactionManagerService>(TransactionManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
