import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty({ example: 'فيلا فاخرة على البحر', description: 'عنوان العقار' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'الإسكندرية', description: 'موقع العقار' })
  @IsString()
  @IsNotEmpty()
  location!: string;

  @ApiProperty({ example: 150, description: 'السعر لليلة الواحدة' })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ example: 'وصف العقار بالتفصيل', description: 'وصف العقار' })
  @IsString()
  @IsNotEmpty()
  description!: string;
}