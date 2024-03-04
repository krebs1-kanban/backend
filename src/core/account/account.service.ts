import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateAccountDto } from './dto';

@Injectable()
export class AccountService {
  constructor(private readonly client: PrismaService) {}

  async create(id: string) {
    return this.client.account.create({
      data: {
        userId: id,
      },
    });
  }

  async getByUserId(userId: string) {
    return this.client.account.findUniqueOrThrow({
      where: {
        userId: userId,
      },
    });
  }

  async update(id: string, dto: UpdateAccountDto) {
    return this.client.account.update({
      where: { userId: id },
      data: { ...dto },
    });
  }
}
