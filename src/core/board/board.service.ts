import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import {
  CreateBoardDto,
  MoveCardDto,
  MoveListDto,
  UpdateBoardDto,
} from './dto';
import { GetByIdQueryParams } from './dto/query-params';

@Injectable()
export class BoardService {
  constructor(private readonly client: PrismaService) {}

  async create(data: CreateBoardDto) {
    const result = await this.client.board.create({ data: data });
    return result;
  }

  async findById(id: string, params?: GetByIdQueryParams) {
    const result = await this.client.board.findUnique({
      where: { id: id },
      include: {
        tags: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        lists: {
          include: {
            cards: {
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
              },
              where: {
                ...(params &&
                  (params.showArchived! ? {} : { isArchived: false })),
              },
              orderBy: {
                index: 'asc',
              },
            },
          },
          where: {
            ...(params && (params.showArchived! ? {} : { isArchived: false })),
          },
          orderBy: {
            index: 'asc',
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

  async moveList(data: MoveListDto) {
    if (data.fromIndex === data.toIndex) return;

    if (data.fromIndex < data.toIndex) {
      await this.client.list.updateMany({
        where: {
          AND: [
            {
              index: {
                gt: data.fromIndex,
              },
            },
            {
              index: {
                lte: data.toIndex,
              },
            },
            {
              boardId: data.boardId,
            },
          ],
        },
        data: {
          index: {
            decrement: 1,
          },
        },
      });
    } else {
      await this.client.list.updateMany({
        where: {
          AND: [
            {
              index: {
                gte: data.toIndex,
              },
            },
            {
              index: {
                lt: data.fromIndex,
              },
            },
            {
              boardId: data.boardId,
            },
          ],
        },
        data: {
          index: {
            increment: 1,
          },
        },
      });
    }

    await this.client.list.update({
      where: { id: data.listId },
      data: {
        index: data.toIndex,
      },
    });

    return;
  }

  async moveCard(data: MoveCardDto) {
    if (data.fromListId === data.toListId && data.toIndex === data.fromIndex)
      return;

    if (data.fromListId === data.toListId) {
      if (data.fromIndex < data.toIndex) {
        await this.client.card.updateMany({
          where: {
            AND: [
              {
                index: {
                  gt: data.fromIndex,
                },
              },
              {
                index: {
                  lte: data.toIndex,
                },
              },
              {
                listId: data.toListId,
              },
            ],
          },
          data: {
            index: {
              decrement: 1,
            },
          },
        });
      } else {
        await this.client.card.updateMany({
          where: {
            AND: [
              {
                index: {
                  gte: data.toIndex,
                },
              },
              {
                index: {
                  lt: data.fromIndex,
                },
              },
              {
                listId: data.toListId,
              },
            ],
          },
          data: {
            index: {
              increment: 1,
            },
          },
        });
      }
      await this.client.card.update({
        where: { id: data.cardId },
        data: {
          index: data.toIndex,
        },
      });
    } else {
      await this.client.card.updateMany({
        where: {
          AND: [{ index: { gt: data.fromIndex } }, { listId: data.fromListId }],
        },
        data: {
          index: {
            decrement: 1,
          },
        },
      });

      await this.client.card.updateMany({
        where: {
          AND: [{ index: { gte: data.toIndex } }, { listId: data.toListId }],
        },
        data: {
          index: {
            increment: 1,
          },
        },
      });

      await this.client.card.update({
        where: { id: data.cardId },
        data: {
          list: {
            connect: {
              id: data.toListId,
            },
          },
          index: data.toIndex,
        },
      });
    }

    return;
  }
}
