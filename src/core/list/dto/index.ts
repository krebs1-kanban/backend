import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Prisma } from 'prisma/generated/client';
import { CardDto } from 'src/core/card/dto';

export class CreateListDto {
  @ApiProperty({ example: 'List 1' })
  @IsNotEmpty({ message: 'Поле "name" не должно быть пустым' })
  @IsString({ message: 'Имя должно быть строкой' })
  name: string;

  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  @IsNotEmpty({ message: 'Поле "projectId" не должно быть пустым' })
  @IsString({ message: 'id должно быть строкой' })
  boardId: string;
}

export class UpdateListDto {
  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  name?: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;
}

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

  @ApiProperty()
  index: number;

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
