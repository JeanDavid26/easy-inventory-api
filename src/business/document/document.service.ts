import { Injectable } from '@nestjs/common';
import { DocumentManagerService } from 'src/database/db-manager/document-manager/document-manager.service';
import { Document } from 'src/database/entities/Document.entity';
import { UploadDocumentDto } from './dto/upload-document.dto';

@Injectable()
export class DocumentService {
  constructor(private _documentManagerService: DocumentManagerService) {}

  public async uploadDocument(
    file: Express.Multer.File,
    body: UploadDocumentDto,
  ): Promise<Document> {
    console.log(file, body);
    return null;
  }
}
