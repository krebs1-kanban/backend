import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class SetExecutorDto {
  @ApiProperty({ required: true, nullable: false })
  @IsString()
  userId: string;

  @ApiProperty({ required: true, nullable: false })
  @IsString()
  cardId: string;

  @ApiProperty({ required: true, nullable: false })
  @IsBoolean()
  execute: boolean;
}
