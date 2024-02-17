import { IsEnum, IsNotEmpty } from 'class-validator';
import { InventoryTypeEnum } from 'src/database/@models/inventory-type.enum';

export class UpsertInventoryDto {
  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  @IsEnum(InventoryTypeEnum)
  type: InventoryTypeEnum;
}
