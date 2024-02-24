import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class CookieService {
  constructor(private configService: ConfigService) {}

  setToken(res: Response, token: string) {
    res.cookie('access-token', token, {
      httpOnly: true,
      maxAge: parseInt(this.configService.get('jwt').jwtAccessExpires) * 1000,
      sameSite: 'none',
      secure: true,
    });
  }

  removeToken(res: Response) {
    res.clearCookie('access-token');
  }
}
