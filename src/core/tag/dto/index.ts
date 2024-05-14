import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Tag } from 'prisma/generated/client';

export class CreateTagDto {
  @ApiProperty({ example: 'New tag' })
  @IsNotEmpty({ message: 'Поле "name" не должно быть пустым' })
  @IsString({ message: 'Имя должно быть строкой' })
  name: string;

  @ApiProperty({ example: '#FFFFFF', nullable: true, required: false })
  @IsOptional()
  @IsString({ message: 'Код цвета должен быть строкой' })
  color: string;

  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  @IsNotEmpty({ message: 'Поле "boardId" не должно быть пустым' })
  @IsString({ message: 'id должно быть строкой' })
  boardId: string;
}

export class UpdateTagDto {
  @ApiProperty({ example: 'New tag', required: false })
  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  name: string;

  @ApiProperty({ example: '#FFFFFF', required: false, nullable: true })
  @IsOptional()
  @IsString({ message: 'Код цвета должен быть строкой' })
  color: string;
}

export class TagDto implements Tag {
  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  id: string;

  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  boardId: string;

  @ApiProperty({ example: 'Tag 1' })
  name: string;

  @ApiProperty({ example: '#FFFFFF', required: false, nullable: true })
  color: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<TagDto>) {
    Object.assign(this, partial);
  }
}
