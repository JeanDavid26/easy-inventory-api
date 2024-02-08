import { IsNotEmpty } from 'class-validator';

export class UpsertCategoryDto {
  @IsNotEmpty()
  label: string;
}
