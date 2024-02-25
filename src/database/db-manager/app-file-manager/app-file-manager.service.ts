import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppFile } from 'src/database/entities/AppFile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppFileManagerService {
  constructor(@InjectRepository(AppFile) private _repo: Repository<AppFile>) {}

  public async get(id: number): Promise<AppFile> {
    const appFile = await this._repo.findOne({
      where: {
        id,
      },
    });

    if (!appFile) {
      throw new NotFoundException();
    }
    return appFile;
  }

  public async list(): Promise<AppFile[]> {
    return this._repo.find({});
  }

  public async insert(data: Partial<AppFile>): Promise<AppFile> {
    const reference = this._repo.create(data);
    return this._repo.save(reference);
  }

  public async update(id: number, data: Partial<AppFile>): Promise<AppFile> {
    delete data.id;
    data.id = id;
    const appFile = this._repo.create(data);
    const appFileSaved = await this._repo.save(appFile);
    return appFileSaved;
  }

  public async softDelete(id: number): Promise<AppFile> {
    await this.get(id);
    return this._repo.save({
      id,
      deleteDate: new Date(),
    });
  }
}
