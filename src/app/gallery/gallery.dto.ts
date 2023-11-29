import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createGalleryDTO {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Title field is required.'
  })
  title: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Slug field is required.'
  })
  slug: string;
}

export class updateGalleryDTO {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Title field is required.'
  })
  title: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Slug field is required.'
  })
  slug: string;
}
