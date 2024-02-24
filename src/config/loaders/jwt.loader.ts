import { registerAs } from '@nestjs/config';
import { configLoader } from '.';

export const jwtConfigLoader = registerAs('jwt', () => configLoader().jwt);
