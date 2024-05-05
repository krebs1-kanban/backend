import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Prisma } from 'prisma/generated/client';
import { TagDto } from 'src/core/tag/dto';

type card = Prisma.CardGetPayload<{
  include: {
    tags: true;
  };
}>;
export class CardDto implements card {
  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  id: string;

  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  listId: string;

  @ApiProperty({ example: 'Card 1' })
  name: string;

  @ApiProperty({ example: 'Card description', nullable: true })
  description: string | null;

  @ApiProperty()
  dueDateTime: Date;

  @ApiProperty({ example: false })
  isArchived: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ApiProperty({ type: [TagDto] })
  tags: TagDto[];

  constructor({ tags, ...data }: Partial<CardDto>) {
    Object.assign(this, data);

    if (tags) {
      this.tags = tags.map((val) => new TagDto(val));
    }
  }
}
