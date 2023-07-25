import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {ApiForbiddenResponse, ApiResponse, ApiTags} from '@nestjs/swagger';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/create-coffee.dto/update-coffee.dto';
import { PaginationQuery } from '../common/dto/pagination-query/pagination-query';
import { Public } from '../common/decorators/public.decorator';

@Controller('coffees')
@ApiTags('coffees')
export class CoffeesController {
  private readonly logger = new Logger(CoffeesController.name);

  constructor(private readonly coffeesService: CoffeesService) {}

  @ApiForbiddenResponse({ description: 'Forbidden resource.' })
  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() paginationQuery: PaginationQuery) {
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') coffeeId: string) {
    return this.coffeesService.findById(coffeeId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateCoffee(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  removeCoffee(@Param('id', ParseIntPipe) id: string) {
    return this.coffeesService.remove(id);
  }
}
