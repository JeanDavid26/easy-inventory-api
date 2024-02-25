import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/database/entities/User.entity';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {}

  @Get('current')
  public getCurrentUser(@Req() req): Promise<User> {
    const userReq = req.user;
    return this._userService.getCurrentUser(userReq.userId);
  }
}
