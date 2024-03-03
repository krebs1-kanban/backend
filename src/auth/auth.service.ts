import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/core/users/users.service';
import { SignInDto, SignUpDto } from './dto/';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private usersService: UsersService,
    private passwordService: PasswordService,
  ) {}

  async signIn(dto: SignInDto) {
    const checkUser = await this.usersService.getByEmail(dto.email);

    if (!checkUser) {
      throw new UnauthorizedException({ type: 'wrong-email-or-password' });
    }

    const hashedPassword = this.passwordService.getHash(
      dto.password,
      checkUser.salt,
    );

    if (hashedPassword !== checkUser.password) {
      throw new UnauthorizedException({ type: 'wrong-email-or-password' });
    }

    const accessToken = await this.jwt.signAsync({
      id: checkUser.id,
      email: checkUser.email,
    });

    return { accessToken };
  }

  async signUp(dto: SignUpDto) {
    const checkUser = await this.usersService.getByEmail(dto.email);

    if (checkUser) {
      throw new BadRequestException({ type: 'email-exists' });
    }

    const salt = this.passwordService.getSalt();
    const hashedPassword = this.passwordService.getHash(dto.password, salt);

    const newUser = await this.usersService.create({
      email: dto.email,
      password: hashedPassword,
      salt: salt,
    });

    const accessToken = await this.jwt.signAsync({
      id: newUser.id,
      email: newUser.email,
    });

    return { accessToken };
  }
}
