import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
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
  @HttpCode(HttpStatus.CREATED)
  createCoffee(@Body() body) {
    return body;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateCoffee(@Param('id') id: string, @Body() body) {
    return `Element with ${id} will be updated with ${body.name}`;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  removeCoffee(@Param('id') id: string) {
    return `Element with ${id} will be removed with`;
  }
}
