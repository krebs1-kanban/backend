import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [CoreModule, DatabaseModule],
})
export class AppModule {}
