import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  @MinLength(10, {
    message: 'Title is too short',
  })
  @MaxLength(50, {
    message: 'Title is too long',
  })
  readonly name: string;

  @IsString()
  @MinLength(4, {
    message: 'Title is too short',
  })
  @MaxLength(50, {
    message: 'Title is too long',
  })
  readonly brand: string;

  @IsString({ each: true })
  @MinLength(4, {
    message: 'Title is too short',
    each: true,
  })
  @MaxLength(50, {
    message: 'Title is too long',
    each: true,
  })
  readonly flavours: string[];
}
