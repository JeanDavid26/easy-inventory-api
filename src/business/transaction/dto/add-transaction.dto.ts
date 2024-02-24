import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { TransactionTypeEnum } from 'src/database/@models/transaction-type.enum';

export class AddTransactionDto {
  @IsNotEmpty()
  @IsNumber()
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
  @IsNumber()
  articleId: number;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
