import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from 'src/shared/decorator/public.decorator';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from 'src/database/entities/User.entity';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: SignInDto): Promise<{ access_token: string }> {
    return this._authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() user: SignUpDto): Promise<User> {
    return this._authService.signUp(user);
  }
}
