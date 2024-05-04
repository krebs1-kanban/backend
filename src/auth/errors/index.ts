import { ApiProperty } from '@nestjs/swagger';

export class EmailExistsError {
  @ApiProperty({ example: 'email-exists' })
  type: string;
}
