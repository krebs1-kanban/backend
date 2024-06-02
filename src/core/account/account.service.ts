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

  async update(userId: string, data: UpdateAccountDto) {
    return await this.client.account.update({
      where: { userId: userId },
      data: { ...data },
    });
  }
}
