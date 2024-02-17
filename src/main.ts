import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const serverConfig = configService.get('server');
  const { host, port } = serverConfig;

  await app.listen(port, host, () => {
    Logger.log(`Server ready on http://${host}:${port}`, 'Application');
  });
}
bootstrap();
