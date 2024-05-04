import { Module } from '@nestjs/common';
import { AccountModule } from 'src/core/account/account.module';
import { DatabaseModule } from 'src/database/database.module';
import { ProfileService } from './profile.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule, AccountModule],
  providers: [UsersService, ProfileService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
