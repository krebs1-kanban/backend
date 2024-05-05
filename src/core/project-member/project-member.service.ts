import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProjectDto } from '../project/dto';
import { CreateProjectMemberDto } from './dto';

@Injectable()
export class ProjectMemberService {
  constructor(private readonly client: PrismaService) {}

  async create(data: CreateProjectMemberDto) {
    const member = await this.client.membersOnProjects.create({
      data: { ...data },
    });
    return member;
  }

  async getProjectsByUserId(userId: string): Promise<ProjectDto[]> {
    const members = await this.client.membersOnProjects.findMany({
      where: { userId: userId },
      select: { project: true },
    });

    const projects = members.map((val) => new ProjectDto({ ...val.project }));

    return projects;
  }
}
