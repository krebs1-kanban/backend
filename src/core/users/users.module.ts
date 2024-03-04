import { Module } from '@nestjs/common';
import { AccountModule } from 'src/core/account/account.module';
import { DatabaseModule } from 'src/database/database.module';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule, AccountModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
