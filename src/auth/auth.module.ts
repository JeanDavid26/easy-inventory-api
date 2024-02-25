import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './services/auth.guard';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '14d' },
    }),
    SharedModule,
  ],
  exports: [AuthGuard],
})
export class AuthModule {}
