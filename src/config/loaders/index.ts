type ConfigLoader = {
	sever: {
		host: string,
		port: number,
	},
	jwt: {
		jwtSecret: string,
		jwtRefreshExpires: string,
		jwtAccessExpires: string,
	}
}

export const configLoader = ():ConfigLoader => ({
	sever: {
		host: process.env.HOST,
		port: parseInt(process.env.PORT),
	},
	jwt: {
		jwtSecret: process.env.JWT_SECRET,
		jwtRefreshExpires: process.env.JWT_REFRESH_EXPIRES,
		jwtAccessExpires: process.env.JWT_ACCESS_EXPIRES,
	}
})