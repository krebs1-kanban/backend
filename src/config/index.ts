import { ConfigModuleOptions } from '@nestjs/config';
import { jwtConfigLoader } from './loaders/jwt.loader';
import { mailerConfigLoader } from './loaders/mailer.loader';
import { serverConfigLoader } from './loaders/server.loader';
import { configSchema } from './schemas/config.schema';

export const configOptions: ConfigModuleOptions = {
  envFilePath: '.env',
  cache: true,
  isGlobal: true,
  load: [serverConfigLoader, jwtConfigLoader, mailerConfigLoader],
  validationSchema: configSchema,
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};
