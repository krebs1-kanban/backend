import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/core/mail/mail.service';
import { UsersService } from 'src/core/users/users.service';
import { PrismaService } from 'src/database/prisma.service';
import {
  PasswordResetConfirmDto,
  PasswordResetRequestDto,
  SignInDto,
  SignUpDto,
} from './dto/';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private usersService: UsersService,
    private passwordService: PasswordService,
    private readonly client: PrismaService,
    private readonly mailService: MailService,
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

  async passwordResetReq(dto: PasswordResetRequestDto) {
    const checkUser = await this.usersService.getByEmail(dto.email);

    if (!checkUser) return;

    const passwordReset = await this.client.passwordReset.create({
      data: {
        userId: checkUser.id,
        expirationTime: new Date(Date.now() + 60 * 60 * 1000),
        newPassword: dto.password,
      },
    });

    this.mailService.SendResetPasswordCode(checkUser.email, passwordReset.id);

    return;
  }

  async passwordResetConfirm(dto: PasswordResetConfirmDto) {
    const checkPasswordReset = await this.client.passwordReset.findUnique({
      where: { id: dto.code },
    });

    if (!checkPasswordReset) {
      throw new BadRequestException({ type: 'wrong-reset-code' });
    }

    const newSalt = this.passwordService.getSalt();
    const newHashedPassword = this.passwordService.getHash(
      checkPasswordReset.newPassword,
      newSalt,
    );

    const newUser = await this.usersService.update(checkPasswordReset.userId, {
      salt: newSalt as string,
      password: newHashedPassword as string,
    });
    await this.client.passwordReset.delete({ where: { id: dto.code } });

    //SEND EMAIL

    return newUser;
  }
}
