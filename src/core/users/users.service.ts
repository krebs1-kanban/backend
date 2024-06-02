import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AccountService } from '../account/account.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly client: PrismaService,
    private readonly accountService: AccountService,
  ) {}

  getById(id: string) {
    return this.client.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  getByEmail(email: string) {
    return this.client.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async create(data: CreateUserDto) {
    const user = await this.client.user.create({
      data: {
        ...data,
      },
    });

    await this.accountService.create(user.id);

    return user;
  }

  update(id: string, data: UpdateUserDto) {
    return this.client.user.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
  }
}
