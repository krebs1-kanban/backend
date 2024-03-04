import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from 'src/config';
import { AccountModule } from './account/account.module';

@Module({
  imports: [ConfigModule.forRoot(configOptions), AccountModule],
})
export class CoreModule {}
