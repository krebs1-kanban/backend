import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const serverConfig = configService.get('server');
  const { host, port, frontendUrl } = serverConfig;

  app.setGlobalPrefix('api');
  app.use(cookieParser());

  app.enableCors({
    origin: [frontendUrl],
    credentials: true,
    exposedHeaders: 'set-cookie',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Project management API')
    .setDescription('Project management API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, host, () => {
    Logger.log(`Server ready on http://${host}:${port}`, 'Application');
  });
}
bootstrap();
