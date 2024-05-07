import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateBoardDto, UpdateBoardDto } from './dto';

@Injectable()
export class BoardService {
  constructor(private readonly client: PrismaService) {}

  async create(data: CreateBoardDto) {
    const result = await this.client.board.create({ data: data });
    return result;
  }

  async findById(id: string) {
    const result = await this.client.board.findUnique({
      where: { id: id },
      include: {
        tags: true,
        lists: {
          include: {
            cards: {
              include: {
                tags: true,
                files: true,
              },
            },
          },
        },
      },
    });
    return result;
  }

  async update(id: string, data: UpdateBoardDto) {
    const result = await this.client.board.update({
      where: { id: id },
      data: data,
    });
    return result;
  }
}
