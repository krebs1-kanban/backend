import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SessionInfo } from 'src/auth/decorators/SessionInfo.decorator';
import { GetSessionInfoDto } from 'src/auth/dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ProjectMemberDto } from '../project-member/dto';
import {
  CreateProjectDto,
  ProjectDto,
  ProjectWithDetailsDto,
  UpdateProjectDto,
} from './dto';
import { ProjectService } from './project.service';

@Controller('projects')
@ApiTags('projects')
@UseGuards(AuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: ProjectDto })
  async create(
    @SessionInfo() session: GetSessionInfoDto,
    @Body() body: CreateProjectDto,
  ) {
    const data = await this.projectService.create(body, session.id);
    const res = new ProjectDto({ ...data });
    return res;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('join/:inviteLink')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: ProjectMemberDto })
  async join(
    @SessionInfo() session: GetSessionInfoDto,
    @Param('inviteLink') inviteLink: string,
  ) {
    const res = await this.projectService.join(inviteLink, session.id);
    return res;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [ProjectDto] })
  async get(@SessionInfo() session: GetSessionInfoDto) {
    const res = await this.projectService.getWhereMember(session.id);
    return res;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProjectWithDetailsDto })
  async getById(@Param('id') id: string) {
    const res = await this.projectService.getById(id);
    return res;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProjectDto })
  async update(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    const res = await this.projectService.update(id, body);
    return res;
  }
}
