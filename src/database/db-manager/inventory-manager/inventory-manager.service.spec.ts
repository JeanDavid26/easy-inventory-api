import { Test, TestingModule } from '@nestjs/testing';
import { InventoryManagerService } from './inventory-manager.service';

describe('InventoryManagerService', () => {
  let service: InventoryManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryManagerService],
    }).compile();

    service = module.get<InventoryManagerService>(InventoryManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
