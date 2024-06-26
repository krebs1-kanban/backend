import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty({ example: 'clt4n9p8c0000wxj5r339y91u' })
  userId: string;

  @ApiProperty({ example: 'test', nullable: true })
  name: string | null;

  @ApiProperty({ example: 'test@test.ru' })
  email: string;

  @ApiProperty({ example: '/imgs/avatars/445849584.png', nullable: true })
  avatarImg: string;

  constructor(data: ProfileDto) {
    this.userId = data.userId;
    this.name = data.name;
    this.email = data.email;
    this.avatarImg = data.avatarImg;
  }
}
