import { ConfigModuleOptions } from '@nestjs/config'
import { serverConfigLoader } from './loaders/server.loader'
import { jwtConfigLoader } from './loaders/jwt.loader'
import { configSchema } from './schemas/config.schema'

export const configOptions: ConfigModuleOptions = {
  envFilePath: '.env',
  cache: true,
  isGlobal: true,
  load: [serverConfigLoader, jwtConfigLoader],
  validationSchema: configSchema,
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};