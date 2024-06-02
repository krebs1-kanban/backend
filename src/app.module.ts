import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CoreModule } from 'src/core/core.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('mailer').mailerHost as string,
          port: configService.get('mailer').mailerPort as number,
          requireTLS: true,
          secure: false,
          auth: {
            user: configService.get('mailer').mailerUsername as string,
            pass: configService.get('mailer').mailerPassword as string,
          },
        },
        defaults: {
          from: `"No Reply" <${configService.get('mailer').mailerFrom as string}>`,
        },
        preview: true,
        verifyTransporters: true,
        template: {
          dir: process.cwd() + '/src/core/mail/template/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
