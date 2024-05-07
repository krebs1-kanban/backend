import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { FileModule } from '../file/file.module';
import { CardController } from './card.controller';
import { CardService } from './card.service';

@Module({
  imports: [DatabaseModule, FileModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
