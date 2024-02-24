import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty({ message: 'Поле "E-mail" не должно быть пустым' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Поле "Пароль" не должно быть пустым' })
  @IsString({ message: 'Пароль должен быть строкой' })
  password: string;
}

export class SignUpDto {
  @IsNotEmpty({ message: 'Поле "E-mail" не должно быть пустым' })
  @IsEmail({}, { message: 'Поле "E-mail" должно быть E-mail' })
  email: string;

  @MinLength(8, { message: 'Минимальная длина пароля 8 символов' })
  @IsString({ message: 'Поле "Пароль" должно быть строкой' })
  password: string;
}

export class GetSessionInfoDto {
  id: number;

  email: string;

  iat: number;

  exp: number;
}
