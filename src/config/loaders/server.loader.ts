import { registerAs } from '@nestjs/config'
import { configLoader } from '.'

export const serverConfigLoader = registerAs(
	'server',
	() => configLoader().sever,
)