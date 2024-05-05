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
import { CreateListDto, ListDto, UpdateListDto } from './dto';
import { ListService } from './list.service';

@Controller('lists')
@ApiTags('lists')
@UseGuards(AuthGuard)
export class ListController {
  constructor(private readonly listService: ListService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: ListDto })
  async create(@Body() body: CreateListDto) {
    return new ListDto(await this.listService.create(body));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ListDto })
  async update(@Param('id') id: string, @Body() body: UpdateListDto) {
    return new ListDto(await this.listService.update(id, body));
  }
}
