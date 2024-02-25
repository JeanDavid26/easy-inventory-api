import { Test, TestingModule } from '@nestjs/testing';
import { AppFileManagerService } from './app-file-manager.service';

describe('AppFileManagerService', () => {
  let service: AppFileManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppFileManagerService],
    }).compile();

    service = module.get<AppFileManagerService>(AppFileManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
