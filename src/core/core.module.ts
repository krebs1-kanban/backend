import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from 'src/config';
import { AccountModule } from './account/account.module';
import { ProjectModule } from './project/project.module';
import { ProjectMemberModule } from './project-member/project-member.module';
import { BoardModule } from './board/board.module';
import { ListModule } from './list/list.module';
import { CardModule } from './card/card.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [ConfigModule.forRoot(configOptions), AccountModule, ProjectModule, ProjectMemberModule, BoardModule, ListModule, CardModule, TagModule],
})
export class CoreModule {}
