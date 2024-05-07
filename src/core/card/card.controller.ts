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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CardService } from './card.service';
import { AddRemoveTagDto, CardDto, CreateCardDto, UpdateCardDto } from './dto';

@Controller('cards')
@ApiTags('cards')
@UseGuards(AuthGuard)
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: CardDto })
  async create(@Body() body: CreateCardDto) {
    return new CardDto(await this.cardService.create(body));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('files/:id')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: CardDto })
  async attachFile(
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const card = this.cardService.attachFiles(id, files);
    return card;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CardDto })
  async getById(@Param('id') id: string) {
    return new CardDto(await this.cardService.findById(id));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('add-tag/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CardDto })
  async addTag(@Param('id') id: string, @Body() body: AddRemoveTagDto) {
    return new CardDto(await this.cardService.addTag(id, body));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('remove-tag/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CardDto })
  async removeTag(@Param('id') id: string, @Body() body: AddRemoveTagDto) {
    return new CardDto(await this.cardService.removeTag(id, body));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CardDto })
  async update(@Param('id') id: string, @Body() body: UpdateCardDto) {
    return new CardDto(await this.cardService.update(id, body));
  }
}
