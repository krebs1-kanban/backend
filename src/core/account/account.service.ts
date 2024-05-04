import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

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
}
