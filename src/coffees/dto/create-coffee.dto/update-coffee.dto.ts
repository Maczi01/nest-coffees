import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateCoffeeDto } from './create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {
  @IsString()
  @IsOptional()
  @MinLength(4, {
    message: 'Title is too short',
  })
  @MaxLength(50, {
    message: 'Title is too long',
  })
  readonly name?: string;

  @IsString()
  @IsOptional()
  @MinLength(4, {
    message: 'Title is too short',
    each: true,
  })
  @MaxLength(50, {
    message: 'Title is too long',
    each: true,
  })
  readonly brand?: string;

  @IsString({ each: true })
  @IsOptional()
  @MinLength(4, {
    message: 'Title is too short',
    each: true,
  })
  @MaxLength(50, {
    message: 'Title is too long',
    each: true,
  })
  readonly flavours?: string[];
}
