import { Injectable } from '@nestjs/common';
import { UserManagerService } from 'src/database/db-manager/user-manager/user-manager.service';
import { User } from 'src/database/entities/User.entity';

@Injectable()
export class UserService {
  constructor(private _userManagerService: UserManagerService) {}

  public async getCurrentUser(id: number): Promise<User> {
    const user = await this._userManagerService.get(id);
    delete user.password;
    return user;
  }
}
