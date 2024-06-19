import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { $Enums, MembersOnProjects } from 'prisma/generated/client';
import { ProfileDto } from 'src/core/users/dto/profile.dto';

export class CreateProjectMemberDto {
  userId: string;
  projectId: string;
  role: $Enums.ProjectRole;
}

export class ProjectMemberDto implements MembersOnProjects {
  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  userId: string;

  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  projectId: string;

  @ApiProperty({ example: 'USER', enum: $Enums.ProjectRole })
  role: $Enums.ProjectRole;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<ProjectMemberDto>) {
    Object.assign(this, partial);
  }
}

export class ProjectMemberWithDetailsDto {
  @ApiProperty({ type: ProfileDto })
  profile: ProfileDto;

  @ApiProperty({ example: 'USER', enum: $Enums.ProjectRole })
  role: $Enums.ProjectRole;

  constructor(data: ProjectMemberWithDetailsDto) {
    this.profile = data.profile;
    this.role = data.role;
  }
}

export class ProjectMemberRoleDto {
  @ApiProperty({ example: $Enums.ProjectRole.ADMIN, enum: $Enums.ProjectRole })
  role: $Enums.ProjectRole;

  constructor(data: ProjectMemberRoleDto) {
    this.role = data.role;
  }
}
