import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtFactory = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: configService.get('jwt').jwtSecret,
  global: true,
  signOptions: {
    expiresIn: parseInt(configService.get('jwt').jwtAccessExpires),
    algorithm: 'HS512',
  },
});
