import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/create-coffee.dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  private readonly logger = new Logger(CoffeesService.name);
  private coffees: Coffee[] | CreateCoffeeDto[] | UpdateCoffeeDto = [
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
    this.logger.log(`Get item with id ${coffeeId}`);
    const coffee = this.coffees.find(({ id }) => id === +coffeeId);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${coffeeId} not found`);
    }
    return coffee;
  }

  create(body: CreateCoffeeDto) {
    this.logger.log(
      `Create coffee invoked to add coffee with name ${body.name}`,
    );
    return this.coffees.push(body);
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    this.logger.log(`Delete coffee invoked to delete coffee with id: ${id}`);
    return (this.coffees[id] = updateCoffeeDto);
  }

  remove(id: number) {
    return this.coffees.splice(id, 1);
  }
}
