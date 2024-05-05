import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateTagDto, TagDto, UpdateTagDto } from './dto';
import { TagService } from './tag.service';

@Controller('tags')
@ApiTags('tags')
@UseGuards(AuthGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: TagDto })
  async create(@Body() body: CreateTagDto) {
    return new TagDto(await this.tagService.create(body));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: TagDto })
  async update(@Param('id') id: string, @Body() body: UpdateTagDto) {
    return new TagDto(await this.tagService.update(id, body));
  }
}
