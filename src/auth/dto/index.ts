import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'test@test.com' })
  @IsNotEmpty({ message: 'Поле "E-mail" не должно быть пустым' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsNotEmpty({ message: 'Поле "Пароль" не должно быть пустым' })
  @IsString({ message: 'Пароль должен быть строкой' })
  password: string;
}

export class SignUpDto {
  @ApiProperty({ example: 'test@test.com' })
  @IsNotEmpty({ message: 'Поле "E-mail" не должно быть пустым' })
  @IsEmail({}, { message: 'Поле "E-mail" должно быть E-mail' })
  email: string;

  @ApiProperty({ example: '12345678' })
  @MinLength(8, { message: 'Минимальная длина пароля 8 символов' })
  @IsString({ message: 'Поле "Пароль" должно быть строкой' })
  password: string;
}

export class GetSessionInfoDto {
  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  id: string;

  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @ApiProperty({ example: 1709055090 })
  iat: number;

  @ApiProperty({ example: 1709141490 })
  exp: number;
}

export class PasswordResetRequestDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Поле "E-mail" не должно быть пустым' })
  @IsEmail({}, { message: 'Поле "E-mail" должно быть E-mail' })
  email: string;

  @ApiProperty()
  @MinLength(8, { message: 'Минимальная длина пароля 8 символов' })
  @IsString({ message: 'Поле "Пароль" должно быть строкой' })
  password: string;
}

export class PasswordResetConfirmDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Поле "Код" не должно быть пустым' })
  @IsString({ message: 'Поле "Код" должно быть строкой' })
  code: string;
}
