import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { SharedModule } from 'src/shared/shared.module';
import { InventoryService } from './inventory.service';

@Module({
  controllers: [InventoryController],
  imports: [SharedModule],
  providers: [InventoryService],
})
export class InventoryModule {}
