import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AccountService } from './account.service';

@Module({
  imports: [DatabaseModule],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
