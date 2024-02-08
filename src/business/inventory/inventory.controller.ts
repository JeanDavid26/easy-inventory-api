import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InventoryManagerService } from 'src/database/db-manager/inventory-manager/inventory-manager.service';
import { Inventory } from 'src/database/entities/Inventory.entity';
import { UpsertInventoryDto } from './dto/upsert-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private _inventoryManagerService: InventoryManagerService) {}

  @Get()
  public list(): Promise<Inventory[]> {
    return this._inventoryManagerService.list();
  }

  @Get(':id')
  public lecture(@Param('id') id: number): Promise<Inventory> {
    return this._inventoryManagerService.get(id);
  }

  @Put(':id')
  public modifier(
    @Param(':id') id: number,
    @Body() data: UpsertInventoryDto,
  ): Promise<Inventory> {
    return this._inventoryManagerService.update(id, data);
  }

  @Post()
  public ajouter(@Body() data: UpsertInventoryDto): Promise<Inventory> {
    return this._inventoryManagerService.insert(data);
  }
}
