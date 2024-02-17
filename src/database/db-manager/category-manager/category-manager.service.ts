import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/Category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryManagerService {
  constructor(
    @InjectRepository(Category) private _repo: Repository<Category>,
  ) {}

  public async get(id: number): Promise<Category> {
    const category = await this._repo.findOne({
      where: {
        id,
      },
      relations: ['tArticle'],
    });

    if (!category) {
      throw new BadRequestException('Article not found');
    }
    return category;
  }

  public async list(): Promise<Category[]> {
    return this._repo.find({
      relations: ['tArticle'],
    });
  }

  public async insert(data: Partial<Category>): Promise<Category> {
    const reference = this._repo.create(data);
    return this._repo.save(reference);
  }

  public async update(id: number, data: Partial<Category>): Promise<Category> {
    delete data.id;
    data.id = id;
    return this._repo.save(data);
  }

  public async softDelete(id: number): Promise<Category> {
    await this.get(id);
    return this._repo.save({
      id,
      deleteDate: new Date(),
    });
  }
}
