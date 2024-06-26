import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { $Enums, Prisma } from 'prisma/generated/client';
import { FileDto } from 'src/core/file/dto';
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
  @ApiProperty({ example: 'Card 1', nullable: true, required: false })
  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  name?: string;

  @ApiProperty({
    example: 'Card description 1',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  description?: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dueDateTime?: Date;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString()
  cover?: string;

  @ApiProperty({
    enum: $Enums.CardStatus,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsEnum($Enums.CardStatus)
  status: $Enums.CardStatus;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;
}

export class AttachFilesDto {
  @ApiProperty({ type: Array, format: 'binary' })
  files: string[];
}

export class AddRemoveTagDto {
  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  @IsNotEmpty({ message: 'Поле "tagId" не должно быть пустым' })
  @IsString({ message: 'id должно быть строкой' })
  tagId: string;
}

export class DetachFileDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  filename: string;
}

type card = Prisma.CardGetPayload<{
  include: {
    tags: true;
    files: true;
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

  @ApiProperty()
  cover: string;

  @ApiProperty({ enum: $Enums.CardStatus })
  status: $Enums.CardStatus;

  @ApiProperty({ example: false })
  isArchived: boolean;

  @ApiProperty()
  index: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ApiProperty({ type: [TagDto] })
  tags: TagDto[];

  @ApiProperty({ type: [FileDto] })
  files: FileDto[];

  @ApiProperty()
  user_ids: string[];

  constructor({ tags, files, user_ids, ...data }: Partial<CardDto>) {
    Object.assign(this, data);

    if (tags) {
      this.tags = tags.map((val) => new TagDto(val));
    }
    if (files) {
      this.files = files.map((val) => new FileDto(val));
    }
    if (user_ids) {
      this.user_ids = user_ids;
    }
  }
}
