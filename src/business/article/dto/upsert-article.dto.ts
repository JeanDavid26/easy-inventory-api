import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpsertArticleDto {
  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  unitPrice: number;

  @IsNotEmpty()
  referenceCode: string;

  @IsOptional()
  barCode: string;
}
