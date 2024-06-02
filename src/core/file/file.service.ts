import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { PrismaService } from 'src/database/prisma.service';
import { v4 as uuidv4 } from 'uuid';

const bytesInKb = 1000;

interface MyFile {
  displayName?: string;
  name: string;
  path: string;
  extension: string;
  size: number;
  buffer: Express.Multer.File['buffer'];
}

@Injectable()
export class FileService {
  constructor(private readonly client: PrismaService) {}

  private async saveFiles(files: MyFile[], pathInStaticFolder: string) {
    const pathToDir = join(
      __dirname,
      '..',
      '..',
      '..',
      'static',
      pathInStaticFolder,
    );

    if (!existsSync(pathToDir)) {
      await mkdir(pathToDir, { recursive: true });
    }

    const res = await Promise.all(
      files.map(async (file) => {
        try {
          await writeFile(join(pathToDir, file.name), file.buffer);
        } catch (e) {
          throw new InternalServerErrorException({
            type: 'file-writing-internal-server-error',
          });
        }
        return file;
      }),
    );

    return res;
  }

  async create(files: Express.Multer.File[], pathInStaticFolder: string) {
    if (!files.length)
      throw new BadRequestException({ type: 'files-not-provided' });

    const data = files.map((file): MyFile => {
      const displayName = file.originalname;
      const extension = displayName.split('.').pop();
      const name = `${uuidv4()}.${extension}`;
      const size = file.size / bytesInKb;

      return {
        displayName: decodeURI(displayName),
        name: name,
        path: `${pathInStaticFolder}/${name}`,
        extension: extension,
        size: size,
        buffer: file.buffer,
      };
    });

    await this.saveFiles(data, pathInStaticFolder);

    await this.client.file.createMany({
      data: data.map((file) => ({ ...file, buffer: undefined })),
    });

    const names = data.map((item) => item.name);
    return this.getFiles(names);
  }

  async getFiles(names: string[]) {
    return await this.client.file.findMany({
      where: {
        name: {
          in: names,
        },
      },
    });
  }
}
