import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from 'src/config';
import { AccountModule } from './account/account.module';
import { BoardModule } from './board/board.module';
import { CardModule } from './card/card.module';
import { FileModule } from './file/file.module';
import { ListModule } from './list/list.module';
import { ProjectMemberModule } from './project-member/project-member.module';
import { ProjectModule } from './project/project.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    AccountModule,
    ProjectModule,
    ProjectMemberModule,
    BoardModule,
    ListModule,
    CardModule,
    TagModule,
    FileModule,
  ],
})
export class CoreModule {}
