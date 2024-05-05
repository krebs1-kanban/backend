import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly client: PrismaService) {}

  async getProfileByUserId(id: string) {
    const data = await this.client.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        account: {
          select: {
            name: true,
            avatarImg: true,
          },
        },
      },
    });

    const profile = new ProfileDto({
      userId: data.id,
      email: data.email,
      name: data.account.name,
      avatarImg: data.account.avatarImg,
    });

    return profile;
  }
}
