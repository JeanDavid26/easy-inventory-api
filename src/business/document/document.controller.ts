import {
  Body,
  Controller,
  NotImplementedException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { Document } from 'src/database/entities/Document.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDocumentDto } from './dto/upload-document.dto';

@Controller('document')
export class DocumentController {
  constructor(private _documentService: DocumentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadDocumentDto,
  ): Promise<Document> {
    console.log(file, body);
    throw new NotImplementedException();
  }
}
