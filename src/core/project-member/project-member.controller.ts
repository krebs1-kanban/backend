import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { $Enums } from 'prisma/generated/client';
import { SessionInfo } from 'src/auth/decorators/SessionInfo.decorator';
import { GetSessionInfoDto } from 'src/auth/dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  ProjectMemberDto,
  ProjectMemberRoleDto,
  ProjectMemberWithDetailsDto,
} from './dto';
import { changeRoleDto } from './dto/change-role.dto';
import { deleteMemberDto } from './dto/delete-member.dto';
import { ProjectMemberService } from './project-member.service';

@Controller('project-member')
@ApiTags('project-member')
@UseGuards(AuthGuard)
export class ProjectMemberController {
  constructor(private readonly projectMemberService: ProjectMemberService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('all/:projectId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [ProjectMemberWithDetailsDto] })
  async getMembersByProjectId(@Param('projectId') projectId: string) {
    return await this.projectMemberService.findByProjectId(projectId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('project/:projectId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProjectMemberRoleDto })
  async getRoleByProjectId(
    @SessionInfo() session: GetSessionInfoDto,
    @Param('projectId') projectId: string,
  ) {
    return this.projectMemberService.getRoleByProjectId(session.id, projectId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('board/:boardId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProjectMemberRoleDto })
  async getRoleByBoardId(
    @SessionInfo() session: GetSessionInfoDto,
    @Param('boardId') boardId: string,
  ) {
    return this.projectMemberService.getRoleByBoardId(session.id, boardId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('list/:listId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProjectMemberRoleDto })
  async getRoleByListId(
    @SessionInfo() session: GetSessionInfoDto,
    @Param('listId') listId: string,
  ) {
    return this.projectMemberService.getRoleByListId(session.id, listId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('card/:cardId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProjectMemberRoleDto })
  async getRoleByCardId(
    @SessionInfo() session: GetSessionInfoDto,
    @Param('cardId') cardId: string,
  ) {
    return this.projectMemberService.getRoleByCardId(session.id, cardId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('change-role')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProjectMemberDto })
  async changeRole(@Body() body: changeRoleDto) {
    return await this.projectMemberService.changeRole(
      body.userId,
      body.projectId,
      body.role as $Enums.ProjectRole,
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMember(@Body() body: deleteMemberDto) {
    return await this.projectMemberService.delete(body.userId, body.projectId);
  }
}
