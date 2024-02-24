import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtFactory } from 'src/config/factories/jwt.factory';
import { UsersModule } from 'src/core/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { PasswordService } from './password.service';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtFactory,
    }),
  ],
  providers: [AuthService, CookieService, PasswordService],
  controllers: [AuthController],
})
export class AuthModule {}
