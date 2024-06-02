import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  imports: [ConfigModule],
  exports: [MailService],
})
export class MailModule {}
