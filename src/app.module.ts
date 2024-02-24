import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CoreModule, DatabaseModule, AuthModule],
})
export class AppModule {}
