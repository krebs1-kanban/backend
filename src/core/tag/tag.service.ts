import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTagDto, UpdateTagDto } from './dto';

@Injectable()
export class TagService {
  constructor(private readonly client: PrismaService) {}

  async create(data: CreateTagDto) {
    const result = await this.client.tag.create({ data: data });
    return result;
  }

  async findByBoardId(id: string) {
    const result = await this.client.board.findUnique({
      where: { id: id },
      include: { tags: true },
    });

    return result.tags;
  }

  async update(id: string, data: UpdateTagDto) {
    const result = await this.client.tag.update({
      where: { id: id },
      data: data,
    });
    return result;
  }

  async delete(id: string) {
    const result = await this.client.tag.delete({
      where: {
        id: id,
      },
    });
    return result;
  }
}
