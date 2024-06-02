import * as Joi from 'joi';

export const configSchema = Joi.object({
  HOST: Joi.string().default('localhost'),
  PORT: Joi.number().required(),
  FRONTEND_URL: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRES: Joi.number().required(),

  MAILER_USERNAME: Joi.string().required(),
  MAILER_PASSWORD: Joi.string().required(),
  MAILER_HOST: Joi.string().required(),
  MAILER_PORT: Joi.number().required(),
  MAILER_FROM: Joi.string().required(),
});
