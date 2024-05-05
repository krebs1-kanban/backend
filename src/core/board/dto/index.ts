import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Board } from 'prisma/generated/client';

export class BoardDto implements Board {
  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  id: string;

  @ApiProperty({ example: 'Board 1' })
  name: string;

  @ApiProperty({ example: false })
  isArchived: boolean;

  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  projectId: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<BoardDto>) {
    Object.assign(this, partial);
  }
}
