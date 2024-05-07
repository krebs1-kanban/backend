import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { FileService } from '../file/file.service';
import { AddRemoveTagDto, CreateCardDto, UpdateCardDto } from './dto';

@Injectable()
export class CardService {
  constructor(
    private readonly client: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async create(data: CreateCardDto) {
    const result = await this.client.card.create({ data: data });
    return result;
  }

  async findById(id: string) {
    const result = await this.client.card.findUnique({
      where: { id: id },
      include: {
        tags: true,
        files: true,
      },
    });
    return result;
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

    names.forEach(async (name) => {
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
    });

    return await this.findById(id);
  }
}
