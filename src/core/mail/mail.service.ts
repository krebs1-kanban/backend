import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  public SendResetPasswordCode(to: string, resetCode: string) {
    const frontendUrl = this.configService.get('server').frontendUrl as string;

    this.mailerService
      .sendMail({
        to: to,
        subject: `Запрос на восстановление пароля на ${frontendUrl}`,
        template: 'ResetPasswordCode.template.hbs',
        context: {
          code: resetCode,
          on: frontendUrl,
        },
      })
      .catch((e) => Logger.error(e, 'SendResetPasswordCode'));
  }

  public SendResetPasswordSuccess(to: string) {
    const frontendUrl = this.configService.get('server').frontendUrl as string;

    console.log(to, frontendUrl);

    this.mailerService
      .sendMail({
        to: to,
        subject: `Пароль успешно изменен на ${frontendUrl}`,
        template: 'ResetPasswordSuccess.template.hbs',
        context: {
          on: frontendUrl,
        },
      })
      .catch((e) => Logger.error(e, 'SendResetPasswordSuccess'));
  }
}
