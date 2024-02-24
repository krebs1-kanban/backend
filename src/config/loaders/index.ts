type ConfigLoader = {
  sever: {
    host: string;
    port: number;
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
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    jwtAccessExpires: parseInt(process.env.JWT_ACCESS_EXPIRES),
  },
});
