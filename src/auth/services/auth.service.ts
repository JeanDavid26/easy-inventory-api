import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserManagerService } from 'src/database/db-manager/user-manager/user-manager.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../controller/dto/sign-up.dto';
import { User } from 'src/database/entities/User.entity';

@Injectable()
export class AuthService {
  constructor(
    private _userManagerService: UserManagerService,
    private _jwtService: JwtService,
  ) {}

  public async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this._userManagerService.getByEmail(email);
    const isSamePassword = await this._comparePasswords(
      password,
      user.password,
    );
    if (!isSamePassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.firstName };
    const access_token = await this._jwtService.signAsync(payload);
    return { access_token };
  }

  public async signUp(user: SignUpDto): Promise<User> {
    const password = await this._hashPassword(user.password);
    user.password = password;
    const userCreated = await this._userManagerService.insert(user);
    const userToReturn = await this._userManagerService.get(userCreated.id);
    delete userToReturn.password;
    return userToReturn;
  }

  private async _hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // You can adjust the salt rounds as needed
    return await bcrypt.hash(password, saltRounds);
  }

  private async _comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
