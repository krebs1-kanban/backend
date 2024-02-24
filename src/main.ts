import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3001'],
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  const configService: ConfigService = app.get(ConfigService);
  const serverConfig = configService.get('server');
  const { host, port } = serverConfig;

  await app.listen(port, host, () => {
    Logger.log(`Server ready on http://${host}:${port}`, 'Application');
  });
}
bootstrap();
