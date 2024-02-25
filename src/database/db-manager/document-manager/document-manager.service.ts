import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from 'src/database/entities/Document.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentManagerService {
  constructor(
    @InjectRepository(Document) private _repo: Repository<Document>,
  ) {}

  public async get(id: number): Promise<Document> {
    const document = await this._repo.findOne({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException();
    }
    return document;
  }

  public async list(): Promise<Document[]> {
    return this._repo.find({});
  }

  public async insert(data: Partial<Document>): Promise<Document> {
    const reference = this._repo.create(data);
    return this._repo.save(reference);
  }

  public async update(id: number, data: Partial<Document>): Promise<Document> {
    delete data.id;
    data.id = id;
    const document = this._repo.create(data);
    const documentSaved = await this._repo.save(document);
    return documentSaved;
  }

  public async softDelete(id: number): Promise<Document> {
    await this.get(id);
    return this._repo.save({
      id,
      deleteDate: new Date(),
    });
  }
}
