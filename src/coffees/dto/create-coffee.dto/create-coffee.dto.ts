import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a coffee.' })
  @IsString()
  @MinLength(10, {
    message: 'Title is too short',
  })
  @MaxLength(50, {
    message: 'Title is too long',
  })
  readonly name: string;

  @ApiProperty({ description: 'The brand of a coffee.' })
  @IsString()
  @MinLength(4, {
    message: 'Title is too short',
  })
  @MaxLength(50, {
    message: 'Title is too long',
  })
  readonly brand: string;

  @ApiProperty({ description: 'The flavors of a coffee.', example: [] })
  @IsString({ each: true })
  @MinLength(4, {
    message: 'Title is too short',
    each: true,
  })
  @MaxLength(50, {
    message: 'Title is too long',
    each: true,
  })
  readonly flavors: string[];
}
