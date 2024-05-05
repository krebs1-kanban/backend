import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProjectMemberModule } from '../project-member/project-member.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectLinkController } from './project-link.controller';

@Module({
  imports: [DatabaseModule, ProjectMemberModule],
  controllers: [ProjectController, ProjectLinkController],
  providers: [ProjectService],
})
export class ProjectModule {}
