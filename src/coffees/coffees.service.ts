import { Injectable, Logger } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private readonly logger = new Logger(CoffeesService.name);
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Black',
      brand: 'Tschibo',
      flavours: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    this.logger.log('Find all invoked');
    return this.coffees;
  }

  findById(coffeeId: number) {
    this.logger.log(`Get item with param ${coffeeId}`);
    const n = coffeeId+1
    return this.coffees[0];
  }

  create() {}
}
