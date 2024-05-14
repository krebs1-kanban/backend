import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { $Enums, Project } from 'prisma/generated/client';
import { BoardDto } from 'src/core/board/dto';
import { ProjectMemberWithDetailsDto } from 'src/core/project-member/dto';

export class CreateProjectDto {
  @ApiProperty({ example: 'New project' })
  @IsNotEmpty({ message: 'Поле "name" не должно быть пустым' })
  @IsString({ message: 'Имя должно быть строкой' })
  name: string;
}

export class UpdateProjectDto {
  @ApiProperty({ example: 'New project name', nullable: true, required: false })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsOptional()
  name: string;

  @ApiProperty({ enum: $Enums.ProjectRole, nullable: true, required: false })
  @IsOptional()
  defaultRole: $Enums.ProjectRole;
}

export class ProjectDto implements Project {
  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  id: string;

  @ApiProperty({ example: 'New project' })
  name: string;

  @ApiProperty({ example: false })
  isArchived: boolean;

  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u', nullable: true })
  inviteLink: string;

  @ApiProperty({ example: 'USER', enum: $Enums.ProjectRole })
  defaultRole: $Enums.ProjectRole;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<ProjectDto>) {
    Object.assign(this, partial);
  }
}

export class ProjectWithDetailsDto {
  @ApiProperty({ type: ProjectDto })
  project: ProjectDto;

  @ApiProperty({ type: [ProjectMemberWithDetailsDto] })
  members: ProjectMemberWithDetailsDto[];

  @ApiProperty({ type: [BoardDto] })
  boards: BoardDto[];

  constructor(data: ProjectWithDetailsDto) {
    this.project = data.project;
    this.members = data.members;
    this.boards = data.boards;
  }
}
