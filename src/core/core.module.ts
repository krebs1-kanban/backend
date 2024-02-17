import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from 'src/config';

@Module({
  imports: [ConfigModule.forRoot(configOptions)],
})
export class CoreModule {}
