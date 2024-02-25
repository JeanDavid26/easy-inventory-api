import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserManagerService } from 'src/database/db-manager/user-manager/user-manager.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private _userManagerService: UserManagerService,
    private _jwtService: JwtService,
  ) {}

  public async signIn(email: string, password: string): Promise<string> {
    const user = await this._userManagerService.getByEmail(email);
    const isSamePassword = await this._comparePasswords(
      password,
      user.password,
    );
    if (!isSamePassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.firstName };
    return await this._jwtService.signAsync(payload);
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
