import {
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ProjectDto } from './dto';
import { ProjectService } from './project.service';

@Controller('project-link')
@ApiTags('projects')
@UseGuards(AuthGuard)
export class ProjectLinkController {
  constructor(private readonly projectService: ProjectService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('generate/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProjectDto })
  async generate(@Param('id') id: string) {
    const res = await this.projectService.generateInviteLink(id);
    return res;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('remove/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProjectDto })
  async remove(@Param('id') id: string) {
    const res = await this.projectService.deleteInviteLink(id);
    return res;
  }
}
