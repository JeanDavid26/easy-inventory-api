import { IsNotEmpty } from 'class-validator';

export class UploadDocumentDto {
  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  inventoryId: number;
}
