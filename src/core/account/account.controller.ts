import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SessionInfo } from 'src/auth/decorators/SessionInfo.decorator';
import { GetSessionInfoDto } from 'src/auth/dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AccountService } from './account.service';
import { AccountDto, UpdateAccountDto } from './dto';

@Controller('account')
@ApiTags('account')
@UseGuards(AuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOkResponse({
    type: AccountDto,
  })
  @HttpCode(HttpStatus.OK)
  async getAccountByUserId(
    @SessionInfo() session: GetSessionInfoDto,
  ): Promise<AccountDto> {
    const data = await this.accountService.getByUserId(session.id);
    const req = new AccountDto({ ...data });
    return req;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch()
  @ApiOkResponse({
    type: AccountDto,
  })
  @HttpCode(HttpStatus.OK)
  async patchAccount(
    @Body() body: UpdateAccountDto,
    @SessionInfo() session: GetSessionInfoDto,
  ): Promise<AccountDto> {
    const data = await this.accountService.update(session.id, body);
    const req = new AccountDto({ ...data });
    return req;
  }
}
