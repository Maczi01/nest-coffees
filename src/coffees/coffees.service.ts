import { Injectable, Logger } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private readonly logger = new Logger(CoffeesService.name);
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'White cafe',
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
    const n = coffeeId - 1;
    return this.coffees[n];
  }

  create(body: Coffee) {
    this.logger.log(
      `Create coffee invoked to add coffee with name ${body.name}`,
    );
    return this.coffees.push(body);
  }

  update(id: number, body: Coffee) {
    this.logger.log(`Delete coffee invoked to delete coffee with id: ${id}`);
    return (this.coffees[id] = body);
  }

  remove(id: number) {
    return this.coffees.splice(id, 1);
  }
}
