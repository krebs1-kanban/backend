import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class deleteMemberDto {
  @ApiProperty({ required: true, nullable: false })
  @IsString({ message: 'userId должно быть строкой' })
  userId: string;

  @ApiProperty({ required: true, nullable: false })
  @IsString({ message: 'userId должно быть строкой' })
  projectId: string;
}
