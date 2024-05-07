import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { FileService } from './file.service';

@Module({
  imports: [DatabaseModule],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
