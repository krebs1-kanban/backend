import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Prisma } from 'prisma/generated/client';
import { CardDto } from 'src/core/card/dto';

type list = Prisma.ListGetPayload<{
  include: {
    cards: {
      include: {
        tags: true;
      };
    };
  };
}>;
export class ListDto implements list {
  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  id: string;

  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  boardId: string;

  @ApiProperty({ example: 'List 1' })
  name: string;

  @ApiProperty({ example: false })
  isArchived: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ApiProperty({ type: [CardDto] })
  cards: CardDto[];

  constructor({ cards, ...data }: Partial<ListDto>) {
    Object.assign(this, data);

    if (cards) {
      this.cards = cards.map((val) => new CardDto(val));
    }
  }
}
