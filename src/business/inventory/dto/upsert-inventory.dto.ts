import { IsEnum, IsNotEmpty } from 'class-validator';
import { InventoryTypeEnum } from 'src/database/@models/inventory-type.enum';

export class UpsertInventoryDto {
  @IsNotEmpty()
  label: number;

  @IsNotEmpty()
  @IsEnum(InventoryTypeEnum)
  type: InventoryTypeEnum;
}
