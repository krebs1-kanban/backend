import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SessionInfo } from 'src/auth/decorators/SessionInfo.decorator';
import { GetSessionInfoDto } from 'src/auth/dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateAccountDto } from '../account/dto';
import { ProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  @ApiOkResponse({ type: ProfileDto })
  @HttpCode(HttpStatus.OK)
  async getProfileByUserId(@Param('id') id: string): Promise<ProfileDto> {
    const data = await this.profileService.getProfileByUserId(id);
    return data;
  }

  @Get()
  @ApiOkResponse({ type: ProfileDto })
  @HttpCode(HttpStatus.OK)
  async getProfile(
    @SessionInfo() session: GetSessionInfoDto,
  ): Promise<ProfileDto> {
    const data = await this.profileService.getProfileByUserId(session.id);
    return data;
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProfileDto })
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Param('id') id: string,
    @Body() body: UpdateAccountDto,
  ): Promise<ProfileDto> {
    const data = await this.profileService.updateProfile(id, body);
    return data;
  }
}
