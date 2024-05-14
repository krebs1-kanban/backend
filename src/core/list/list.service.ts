import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateListDto, UpdateListDto } from './dto';

@Injectable()
export class ListService {
  constructor(private readonly client: PrismaService) {}

  async create(data: CreateListDto) {
    const board = await this.client.board.findUnique({
      where: { id: data.boardId },
      include: { lists: true },
    });

    const index = board.lists.length;

    const result = await this.client.list.create({ data: { ...data, index } });
    return result;
  }

  async update(id: string, data: UpdateListDto) {
    const result = await this.client.list.update({
      where: { id: id },
      data: data,
    });
    return result;
  }
}
