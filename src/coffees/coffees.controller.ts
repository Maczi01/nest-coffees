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
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
@ApiTags('coffees')
export class CoffeesController {
  private readonly logger = new Logger(CoffeesController.name);

  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;
    this.logger.log('Find all invoked');
    return this.coffeesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') coffeeId: number) {
    return this.coffeesService.findById(coffeeId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCoffee(@Body() body) {
    this.logger.log(
      `Create coffee invoked to add coffee with name ${body.name}`,
    );
    return body;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateCoffee(@Param('id') id: string, @Body() body) {
    this.logger.log(
      `Update coffee invoked to edit coffee with name ${body.name}`,
    );
    return `Element with ${id} will be updated with ${body.name}`;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  removeCoffee(@Param('id') id: string) {
    this.logger.log(`Delete coffee invoked to delete coffee with id: ${id}`);
    return `Element with ${id} will be removed with`;
  }
}
