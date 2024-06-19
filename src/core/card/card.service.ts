import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { FileService } from '../file/file.service';
import {
  AddRemoveTagDto,
  CardDto,
  CreateCardDto,
  DetachFileDto,
  UpdateCardDto,
} from './dto';
import { SetExecutorDto } from './dto/set-executor.dto';

@Injectable()
export class CardService {
  constructor(
    private readonly client: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async create(data: CreateCardDto) {
    const list = await this.client.list.findUnique({
      where: { id: data.listId },
      include: {
        cards: true,
      },
    });
    const index = list.cards.length;

    const result = await this.client.card.create({ data: { ...data, index } });
    return result;
  }

  async setExecutor(data: SetExecutorDto) {
    await this.client.card.update({
      where: { id: data.cardId },
      data: {
        users: data.execute
          ? {
              connect: {
                id: data.userId,
              },
            }
          : {
              disconnect: {
                id: data.userId,
              },
            },
      },
    });
  }

  async findById(id: string): Promise<CardDto> {
    const result = await this.client.card.findUnique({
      where: { id: id },
      include: {
        tags: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        files: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        users: {
          select: {
            id: true,
          },
          orderBy: {
            id: 'asc',
          },
        },
      },
    });
    return { ...result, user_ids: result.users.map((user) => user.id) };
  }

  async update(id: string, data: UpdateCardDto) {
    const result = await this.client.card.update({
      where: { id: id },
      data: data,
    });
    return result;
  }

  async addTag(id: string, data: AddRemoveTagDto) {
    const result = await this.client.card.update({
      where: { id: id },
      data: {
        tags: {
          connect: {
            id: data.tagId,
          },
        },
      },
    });
    return result;
  }

  async removeTag(id: string, data: AddRemoveTagDto) {
    const result = await this.client.card.update({
      where: { id: id },
      data: {
        tags: {
          disconnect: {
            id: data.tagId,
          },
        },
      },
    });
    return result;
  }

  async attachFiles(id: string, files: Array<Express.Multer.File>) {
    const createdFiles = await this.fileService.create(
      files,
      'project-attachments',
    );

    const names = createdFiles.map((file) => file.name);

    await Promise.all(
      names.map(async (name) => {
        await this.client.card.update({
          where: {
            id: id,
          },
          data: {
            files: {
              connect: {
                name: name,
              },
            },
          },
        });
      }),
    );

    return await this.findById(id);
  }

  async detachFile(id: string, body: DetachFileDto) {
    await this.client.card.update({
      where: {
        id: id,
      },
      data: {
        files: {
          disconnect: {
            name: body.filename,
          },
        },
      },
    });

    return await this.findById(id);
  }
}
