import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InventoryManagerService } from 'src/database/db-manager/inventory-manager/inventory-manager.service';
import { Inventory } from 'src/database/entities/Inventory.entity';
import { UpsertInventoryDto } from './dto/upsert-inventory.dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(
    private _inventoryManagerService: InventoryManagerService,
    private _inventoryService: InventoryService,
  ) {}

  @Get()
  public list(): Promise<Inventory[]> {
    return this._inventoryService.list();
  }

  @Get(':id')
  public get(@Param('id') id: number): Promise<Inventory> {
    id = Number(id);
    return this._inventoryService.get(id);
  }

  @Put(':id')
  public update(
    @Param(':id') id: number,
    @Body() data: UpsertInventoryDto,
  ): Promise<Inventory> {
    id = Number(id);
    return this._inventoryManagerService.update(id, data);
  }

  @Post()
  public insert(@Body() data: UpsertInventoryDto): Promise<Inventory> {
    return this._inventoryManagerService.insert(data);
  }
}
