import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { SessionInfo } from './decorators/SessionInfo.decorator';
import {
  GetSessionInfoDto,
  PasswordResetConfirmDto,
  PasswordResetRequestDto,
  SignInDto,
  SignUpDto,
} from './dto/';
import { EmailExistsError } from './errors';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('sign-up')
  @ApiCreatedResponse()
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() body: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const dto: SignUpDto = {
      email: body.email,
      password: body.password,
    };

    const { accessToken } = await this.authService.signUp(dto);

    this.cookieService.setToken(res, accessToken);
  }

  @Post('sign-in')
  @ApiOkResponse()
  @ApiBadRequestResponse({ type: EmailExistsError })
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const dto: SignInDto = {
      email: body.email,
      password: body.password,
    };

    const { accessToken } = await this.authService.signIn(dto);

    this.cookieService.setToken(res, accessToken);
  }

  @Post('sign-out')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  signOut(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeToken(res);
  }

  @Get('session')
  @ApiOkResponse({ type: GetSessionInfoDto })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
    return session;
  }

  @Post('password-reset/request')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async passwordResetReq(@Body() body: PasswordResetRequestDto) {
    await this.authService.passwordResetReq(body);
  }

  @Post('password-reset/confirm')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async passwordResetConfirm(@Body() body: PasswordResetConfirmDto) {
    await this.authService.passwordResetConfirm(body);
  }
}
