import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    const token = req.cookies['access-token'];

    if (!token) {
      throw new UnauthorizedException({ type: 'token-not-provided' });
    }

    try {
      const payload = await this.jwt.verifyAsync(token);

      req['session'] = payload;
    } catch (err) {
      throw new UnauthorizedException({ type: 'invalid-token' });
    }

    return true;
  }
}
