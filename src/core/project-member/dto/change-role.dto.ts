import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { $Enums } from 'prisma/generated/client';

export class changeRoleDto {
  @ApiProperty({ required: true, nullable: false })
  @IsString({ message: 'userId должно быть строкой' })
  userId: string;

  @ApiProperty({ required: true, nullable: false })
  @IsString({ message: 'userId должно быть строкой' })
  projectId: string;

  @ApiProperty({ required: true, nullable: false, enum: $Enums.ProjectRole })
  @IsString({ message: 'role должно быть строкой' })
  role: string;
}
