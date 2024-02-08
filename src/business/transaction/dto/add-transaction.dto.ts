import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { TransactionTypeEnum } from 'src/database/@models/transaction-type.enum';

export class AddTransactionDto {
  @IsNotEmpty()
  inventoryId: number;

  @IsNotEmpty()
  @IsEnum(TransactionTypeEnum)
  type: TransactionTypeEnum;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => TransactionArticleQuantityDto)
  tArticleQuantity: TransactionArticleQuantityDto[];
}

export class TransactionArticleQuantityDto {
  @IsNotEmpty()
  articleId: number;
  @IsNotEmpty()
  quantity: number;
}
