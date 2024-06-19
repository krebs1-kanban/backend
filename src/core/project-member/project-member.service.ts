import { ForbiddenException, Injectable } from '@nestjs/common';
import { $Enums } from 'prisma/generated/client';
import { PrismaService } from 'src/database/prisma.service';
import { ProjectDto } from '../project/dto';
import { ProfileDto } from '../users/dto/profile.dto';
import {
  CreateProjectMemberDto,
  ProjectMemberRoleDto,
  ProjectMemberWithDetailsDto,
} from './dto';

@Injectable()
export class ProjectMemberService {
  constructor(private readonly client: PrismaService) {}

  async findByProjectId(
    projectId: string,
  ): Promise<ProjectMemberWithDetailsDto[]> {
    const members = await this.client.membersOnProjects.findMany({
      where: { projectId: projectId },
      include: {
        user: {
          include: {
            account: true,
          },
        },
      },
    });
    return members.map((member) => {
      const role = member.role;
      const profile = new ProfileDto({
        userId: member.user.id,
        name: member.user.account.name,
        email: member.user.email,
        avatarImg: member.user.account.avatarImg,
      });
      return new ProjectMemberWithDetailsDto({
        profile: profile,
        role: role,
      });
    });
  }

  async create(data: CreateProjectMemberDto) {
    const member = await this.client.membersOnProjects.create({
      data: { ...data },
    });
    return member;
  }

  async delete(userId: string, projectId: string) {
    const result = await this.client.membersOnProjects.delete({
      where: {
        userId_projectId: {
          userId: userId,
          projectId: projectId,
        },
      },
    });
    return result;
  }

  async changeRole(
    userId: string,
    projectId: string,
    role: $Enums.ProjectRole,
  ) {
    const result = await this.client.membersOnProjects.update({
      where: {
        userId_projectId: {
          userId: userId,
          projectId: projectId,
        },
      },
      data: {
        role: role,
      },
    });
    return result;
  }

  async getProjectsByUserId(userId: string): Promise<ProjectDto[]> {
    const members = await this.client.membersOnProjects.findMany({
      where: { userId: userId },
      select: { project: true },
    });

    const projects = members.map((val) => new ProjectDto({ ...val.project }));

    return projects;
  }

  async getRoleByProjectId(userId: string, projectId: string) {
    const result = await this.client.membersOnProjects.findFirst({
      where: {
        userId: userId,
        projectId: projectId,
      },
    });

    if (!result)
      throw new ForbiddenException({ type: 'user-not-a-member-of-project' });

    return new ProjectMemberRoleDto({ role: result.role });
  }

  async getRoleByBoardId(userId: string, boardId: string) {
    const result = await this.client.board.findFirst({
      where: {
        id: boardId,
      },
      include: {
        project: {
          include: {
            MembersOnProjects: {
              where: {
                userId: userId,
              },
            },
          },
        },
      },
    });

    if (!result)
      throw new ForbiddenException({ type: 'user-not-a-member-of-project' });

    return new ProjectMemberRoleDto({
      role: result.project.MembersOnProjects[0].role,
    });
  }

  async getRoleByListId(userId: string, listId: string) {
    const result = await this.client.list.findFirst({
      where: {
        id: listId,
      },
      include: {
        board: {
          include: {
            project: {
              include: {
                MembersOnProjects: {
                  where: {
                    userId: userId,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!result)
      throw new ForbiddenException({ type: 'user-not-a-member-of-project' });

    return new ProjectMemberRoleDto({
      role: result.board.project.MembersOnProjects[0].role,
    });
  }

  async getRoleByCardId(userId: string, cardId: string) {
    const result = await this.client.card.findFirst({
      where: {
        id: cardId,
      },
      include: {
        list: {
          include: {
            board: {
              include: {
                project: {
                  include: {
                    MembersOnProjects: {
                      where: {
                        userId: userId,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!result)
      throw new ForbiddenException({ type: 'user-not-a-member-of-project' });

    return new ProjectMemberRoleDto({
      role: result.list.board.project.MembersOnProjects[0].role,
    });
  }
}
