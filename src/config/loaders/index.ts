type ConfigLoader = {
  sever: {
    host: string;
    port: number;
    frontendUrl: string;
  };
  jwt: {
    jwtSecret: string;
    jwtAccessExpires: number;
  };
  mailer: {
    mailerUsername: string;
    mailerPassword: string;
    mailerHost: string;
    mailerPort: number;
    mailerFrom: string;
  };
};

export const configLoader = (): ConfigLoader => ({
  sever: {
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    frontendUrl: process.env.FRONTEND_URL,
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    jwtAccessExpires: parseInt(process.env.JWT_ACCESS_EXPIRES),
  },
  mailer: {
    mailerUsername: process.env.MAILER_USERNAME,
    mailerPassword: process.env.MAILER_PASSWORD,
    mailerHost: process.env.MAILER_HOST,
    mailerPort: parseInt(process.env.MAILER_PORT),
    mailerFrom: process.env.MAILER_FROM,
  },
});
