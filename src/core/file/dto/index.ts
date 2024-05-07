import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { File } from 'prisma/generated/client';

export class FileDto implements File {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: false, nullable: true })
  displayName: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  extension: string;

  @ApiProperty({ description: 'File size in kb' })
  size: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(data: Partial<FileDto>) {
    Object.assign(this, data);
  }
}
