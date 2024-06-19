import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
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
import {
  AddRemoveTagDto,
  AttachFilesDto,
  CardDto,
  CreateCardDto,
  DetachFileDto,
  UpdateCardDto,
} from './dto';
import { SetExecutorDto } from './dto/set-executor.dto';

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
  @Post('set-executor')
  @HttpCode(HttpStatus.CREATED)
  async setExecutor(@Body() body: SetExecutorDto) {
    await this.cardService.setExecutor(body);
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
    @Body() {}: AttachFilesDto,
  ) {
    const card = this.cardService.attachFiles(id, files);
    return card;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('files/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async detachFile(@Param('id') id: string, @Body() body: DetachFileDto) {
    this.cardService.detachFile(id, body);
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
    console.log(body.status);
    return new CardDto(await this.cardService.update(id, body));
  }
}
