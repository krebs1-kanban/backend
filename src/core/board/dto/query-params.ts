import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetByIdQueryParams {
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform((val) => {
    if (typeof val.value === 'boolean') return val.value;
    if (val.value === 'false') return false;
    if (val.value === 'true') return true;
  })
  showArchived?: boolean = false;

  constructor(partial: Partial<GetByIdQueryParams>) {
    Object.assign(this, partial);
  }
}
