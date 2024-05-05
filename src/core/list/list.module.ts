import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ListController } from './list.controller';
import { ListService } from './list.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
