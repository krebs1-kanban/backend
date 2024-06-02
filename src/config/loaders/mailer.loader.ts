import { registerAs } from '@nestjs/config';
import { configLoader } from '.';

export const mailerConfigLoader = registerAs(
  'mailer',
  () => configLoader().mailer,
);
