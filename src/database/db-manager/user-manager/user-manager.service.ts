import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserManagerService {
  constructor(@InjectRepository(User) private _repo: Repository<User>) {}

  public async get(id: number): Promise<User> {
    const user = await this._repo.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  public async getByEmail(email: string): Promise<User> {
    const user = await this._repo.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  public async list(): Promise<User[]> {
    return this._repo.find({});
  }

  public async insert(data: Partial<User>): Promise<User> {
    const reference = this._repo.create(data);
    return this._repo.save(reference);
  }

  public async update(id: number, data: Partial<User>): Promise<User> {
    delete data.id;
    data.id = id;
    return this._repo.save(data);
  }

  public async softDelete(id: number): Promise<User> {
    await this.get(id);
    return this._repo.save({
      id,
      deleteDate: new Date(),
    });
  }
}
