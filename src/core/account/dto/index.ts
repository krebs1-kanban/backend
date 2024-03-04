import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Account } from 'prisma/generated/client';

export class AccountDto implements Account {
  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  @IsNotEmpty({ message: "Поле 'id' не должно быть пустым" })
  @IsString({ message: "Поле 'id' должно быть строкой" })
  id: string;

  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  @IsNotEmpty({ message: "Поле 'userId' не должно быть пустым" })
  @IsString({ message: "Поле 'userId' должно быть строкой" })
  userId: string;

  @ApiProperty({ example: 'name', nullable: true })
  name: string | null;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<UpdateAccountDto>) {
    Object.assign(this, partial);
  }
}

export class UpdateAccountDto {
  @ApiProperty({ example: 'new name', nullable: true })
  @Expose()
  name?: string;
}
