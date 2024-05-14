import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { BoardService } from './board.service';
import {
  BoardDto,
  BoardWithDetailsDto,
  CreateBoardDto,
  MoveCardDto,
  MoveListDto,
  UpdateBoardDto,
} from './dto';

@Controller('boards')
@ApiTags('boards')
@UseGuards(AuthGuard)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: BoardDto })
  async create(@Body() body: CreateBoardDto) {
    return new BoardDto(await this.boardService.create(body));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('by-card/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: BoardWithDetailsDto })
  async getByCardId(@Param('id') id: string) {
    return new BoardWithDetailsDto(await this.boardService.findByCardId(id));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: BoardWithDetailsDto })
  async getById(
    @Param('id') id: string,
    @Query('showArchived') showArchived: boolean = false,
  ) {
    return new BoardWithDetailsDto(
      await this.boardService.findById(id, { showArchived }),
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('move-list')
  @HttpCode(HttpStatus.OK)
  async moveList(@Body() body: MoveListDto) {
    await this.boardService.moveList(body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('move-card')
  @HttpCode(HttpStatus.OK)
  async moveCard(@Body() body: MoveCardDto) {
    console.log(body);
    await this.boardService.moveCard(body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: BoardDto })
  async update(@Param('id') id: string, @Body() body: UpdateBoardDto) {
    return new BoardDto(await this.boardService.update(id, body));
  }
}
