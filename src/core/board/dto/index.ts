import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Board, Prisma } from 'prisma/generated/client';
import { ListDto } from 'src/core/list/dto';
import { TagDto } from 'src/core/tag/dto';

export class CreateBoardDto {
  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  @IsNotEmpty({ message: 'Поле "projectId" не должно быть пустым' })
  @IsString({ message: 'id должно быть строкой' })
  projectId: string;

  @ApiProperty({ example: 'New board' })
  @IsNotEmpty({ message: 'Поле "name" не должно быть пустым' })
  @IsString({ message: 'Имя должно быть строкой' })
  name: string;
}

export class UpdateBoardDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isArchived: boolean;
}

export class MoveListDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  listId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  boardId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  fromIndex: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  toIndex: number;
}

export class MoveCardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cardId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fromListId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  toListId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  fromIndex: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  toIndex: number;
}

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

type boardWithDetails = Prisma.BoardGetPayload<{
  include: {
    tags: true;
    lists: {
      include: {
        cards: {
          include: {
            tags: true;
            files: true;
          };
        };
      };
    };
  };
}>;
export class BoardWithDetailsDto implements boardWithDetails {
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

  @ApiProperty({ type: [TagDto] })
  tags: TagDto[];

  @ApiProperty({ type: [ListDto] })
  lists: ListDto[];

  constructor({ tags, lists, ...data }: Partial<BoardWithDetailsDto>) {
    Object.assign(this, data);

    if (tags) {
      this.tags = tags.map((val) => new TagDto(val));
    }

    if (lists) {
      this.lists = lists.map((val) => new ListDto(val));
    }
  }
}
