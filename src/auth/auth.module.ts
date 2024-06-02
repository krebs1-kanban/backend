import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtFactory } from 'src/config/factories/jwt.factory';
import { MailModule } from 'src/core/mail/mail.module';
import { UsersModule } from 'src/core/users/users.module';
import { PrismaService } from 'src/database/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { PasswordService } from './password.service';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    MailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtFactory,
      global: true,
    }),
  ],
  providers: [AuthService, CookieService, PasswordService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
