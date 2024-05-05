import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Tag } from 'prisma/generated/client';

export class TagDto implements Tag {
  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  id: string;

  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  boardId: string;

  @ApiProperty({ example: 'Tag 1' })
  name: string;

  @ApiProperty({ example: '#FFFFFF' })
  color: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<TagDto>) {
    Object.assign(this, partial);
  }
}
