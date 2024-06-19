import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CoreModule } from 'src/core/core.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from './auth/auth.module';
import { ConfigLoaderType } from './config/loaders';

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static-files/',
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const {
          mailerHost,
          mailerPort,
          mailerUsername,
          mailerPassword,
          mailerFrom,
        } = configService.get<ConfigLoaderType['mailer']>('mailer');
        console.log(configService.get<ConfigLoaderType['mailer']>('mailer'));

        return {
          transport: {
            host: mailerHost,
            port: mailerPort,
            requireTLS: true,
            auth: {
              user: mailerUsername,
              pass: mailerPassword,
            },
          },
          defaults: {
            from: `"No Reply" <${mailerFrom}>`,
          },
          //ONLY FOR DEV
          //preview: true,
          verifyTransporters: true,
          template: {
            dir: process.cwd() + '/src/core/mail/template/',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
