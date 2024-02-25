import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { TransactionTypeEnum } from 'src/database/@models/transaction-type.enum';
import { TransformDate } from 'src/shared/decorator/transform-date.decorator';
import { TransformNumber } from 'src/shared/decorator/transform.number.decorator';

export class AddTransactionDto {
  @IsNotEmpty()
  @TransformNumber()
  @IsNumber()
  inventoryId: number;

  @IsNotEmpty()
  @IsEnum(TransactionTypeEnum)
  type: TransactionTypeEnum;

  @IsNotEmpty()
  @TransformDate()
  @IsDate()
  date: Date;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => TransactionArticleQuantityDto)
  tArticleQuantity: TransactionArticleQuantityDto[];
}

export class TransactionArticleQuantityDto {
  @IsNotEmpty()
  @TransformNumber()
  @IsNumber()
  articleId: number;

  @IsNotEmpty()
  @TransformNumber()
  @IsNumber()
  quantity: number;
}
