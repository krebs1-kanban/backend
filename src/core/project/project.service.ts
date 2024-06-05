import { BadRequestException, Injectable } from '@nestjs/common';
import { $Enums } from 'prisma/generated/client';
import { PrismaService } from 'src/database/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { BoardDto } from '../board/dto';
import {
  ProjectMemberDto,
  ProjectMemberWithDetailsDto,
} from '../project-member/dto';
import { ProjectMemberService } from '../project-member/project-member.service';
import { ProfileDto } from '../users/dto/profile.dto';
import {
  CreateProjectDto,
  ProjectDto,
  ProjectWithDetailsDto,
  UpdateProjectDto,
} from './dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly client: PrismaService,
    private readonly projectMemberService: ProjectMemberService,
  ) {}

  async create(data: CreateProjectDto, userId: string) {
    const project = await this.client.project.create({ data: { ...data } });

    await this.projectMemberService.create({
      userId: userId,
      projectId: project.id,
      role: $Enums.ProjectRole.ADMIN,
    });

    return project;
  }

  async getById(id: string): Promise<ProjectWithDetailsDto> {
    const result = await this.client.project.findUnique({
      where: { id: id },
      include: {
        boards: true,
        MembersOnProjects: {
          include: {
            user: {
              include: {
                account: true,
              },
            },
          },
        },
      },
    });

    const boards = result.boards.map((board) => new BoardDto({ ...board }));
    const members = result.MembersOnProjects.map((item) => {
      const user = item.user;
      const account = user.account;
      const profile = new ProfileDto({
        userId: user.id,
        name: account.name,
        email: user.email,
        avatarImg: account.avatarImg,
      });
      return new ProjectMemberWithDetailsDto({
        profile: profile,
        role: item.role,
      });
    });
    delete result['boards'];
    delete result['MembersOnProjects'];
    const project = new ProjectDto({ ...result });

    return new ProjectWithDetailsDto({
      project: project,
      boards: boards,
      members: members,
    });
  }

  async getWhereMember(userId: string): Promise<ProjectDto[]> {
    const data = await this.projectMemberService.getProjectsByUserId(userId);
    return data;
  }

  async update(id: string, data: UpdateProjectDto): Promise<ProjectDto> {
    const project = await this.client.project.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
    return new ProjectDto(project);
  }

  async generateInviteLink(id: string): Promise<ProjectDto> {
    const newLink = uuidv4();

    const project = await this.client.project.update({
      where: {
        id: id,
      },
      data: {
        inviteLink: newLink,
      },
    });
    return new ProjectDto(project);
  }

  async deleteInviteLink(id: string): Promise<ProjectDto> {
    const project = await this.client.project.update({
      where: {
        id: id,
      },
      data: {
        inviteLink: null,
      },
    });
    return new ProjectDto(project);
  }

  async join(inviteLink: string, userId: string): Promise<ProjectMemberDto> {
    const project = await this.client.project.findFirst({
      where: { inviteLink: inviteLink },
    });

    if (!project) throw new BadRequestException({ type: 'project-not-exists' });

    const checkMember = await this.client.membersOnProjects.findFirst({
      where: { userId: userId, projectId: project.id },
    });

    if (checkMember) return new ProjectMemberDto({ ...checkMember });

    const member = await this.projectMemberService.create({
      userId: userId,
      projectId: project.id,
      role: project.defaultRole,
    });

    return new ProjectMemberDto({ ...member });
  }
}
