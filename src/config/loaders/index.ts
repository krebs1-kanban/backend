type ConfigLoader = {
  sever: {
    host: string;
    port: number;
    clientUrl: string;
  };
  jwt: {
    jwtSecret: string;
    jwtAccessExpires: number;
  };
};

export const configLoader = (): ConfigLoader => ({
  sever: {
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    clientUrl: process.env.CLIENT_URL,
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    jwtAccessExpires: parseInt(process.env.JWT_ACCESS_EXPIRES),
  },
});
