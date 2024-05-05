import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Prisma } from 'prisma/generated/client';
import { TagDto } from 'src/core/tag/dto';

export class CreateCardDto {
  @ApiProperty({ example: 'Card 1' })
  @IsNotEmpty({ message: 'Поле "name" не должно быть пустым' })
  @IsString({ message: 'Имя должно быть строкой' })
  name: string;

  @ApiProperty({
    example: 'Card description 1',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  description: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dueDateTime: Date;

  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  @IsNotEmpty({ message: 'Поле "listId" не должно быть пустым' })
  @IsString({ message: 'id должно быть строкой' })
  listId: string;
}

export class UpdateCardDto {
  @ApiProperty({ example: 'List 1' })
  @IsNotEmpty({ message: 'Поле "name" не должно быть пустым' })
  @IsString({ message: 'Имя должно быть строкой' })
  name: string;

  @ApiProperty({
    example: 'Card description 1',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  description: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dueDateTime: Date;
}

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
