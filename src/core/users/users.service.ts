import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly client: PrismaService) {}

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

  create(data: CreateUserDto) {
    return this.client.user.create({
      data: {
        ...data,
      },
    });
  }

  update(id: string, data: CreateUserDto) {
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
