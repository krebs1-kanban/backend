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

  async update(id: string, data: UpdateTagDto) {
    const result = await this.client.tag.update({
      where: { id: id },
      data: data,
    });
    return result;
  }
}
