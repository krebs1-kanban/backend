import { Injectable, NotFoundException } from '@nestjs/common';
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

    if (!result) throw new NotFoundException({ type: 'board-not-found' });

    return result;
  }

  async findByCardId(id: string) {
    const card = await this.client.card.findUnique({
      where: {
        id: id,
      },
      include: {
        list: {
          include: {
            board: true,
          },
        },
      },
    });

    if (!card.list.board)
      throw new NotFoundException({ type: 'board-not-found' });

    return this.findById(card.list.board.id);
  }

  async update(id: string, data: UpdateBoardDto) {
    const result = await this.client.board.update({
      where: { id: id },
      data: data,
    });
    return result;
  }
}
