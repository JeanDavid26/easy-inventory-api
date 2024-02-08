import { IsNotEmpty } from 'class-validator';

export class UpsertArticleDto {
  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  unitPrice: number;

  @IsNotEmpty()
  referenceCode: string;
}
