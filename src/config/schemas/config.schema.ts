import * as Joi from 'joi';

export const configSchema = Joi.object({
  HOST: Joi.string().default('localhost'),
  PORT: Joi.number().required(),

  JWT_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRES: Joi.number().required(),
});
