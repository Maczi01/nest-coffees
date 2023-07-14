import {Controller, Get, Logger, Param} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('coffees')
@ApiTags('coffees')
export class CoffeesController {
  private readonly logger = new Logger(CoffeesController.name);

  @Get()
  findAll() {
    this.logger.log('Find all invoked');
    return 'GET request 2';
  }
  @Get(':id')
  findById(@Param() params) {
    this.logger.log(`Get item with param ${params.id}`);
    return `Get item with param ${params.id}}`;
  }
}
