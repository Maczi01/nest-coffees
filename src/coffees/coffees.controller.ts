import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('coffees')
@ApiTags('coffees')
export class CoffeesController {
  private readonly logger = new Logger(CoffeesController.name);

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    this.logger.log('Find all invoked');
    return 'GET request 2';
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') coffeeId: number) {
    this.logger.log(`Get item with param ${coffeeId}`);
    return `Get item with param ${coffeeId}`;
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  createCoffee(@Body() body) {
    return body;
  }
}
