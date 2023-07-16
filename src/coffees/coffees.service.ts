import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/create-coffee.dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeesService {
  private readonly logger = new Logger(CoffeesService.name);

  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  findAll() {
    this.logger.log('Find all invoked');
    return this.coffeeRepository.find();
  }

  async findById(coffeeId: string) {
    this.logger.log(`Get item with id ${coffeeId}`);
    const coffee = await this.coffeeRepository.findOne({
      where: { id: +coffeeId },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${coffeeId} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    this.logger.log(
      `Create coffee invoked to add coffee with name ${createCoffeeDto.name}`,
    );
    const createdCoffeeEntity = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(createdCoffeeEntity);
  }

  async update(coffeeId: number, updateCoffeeDto: UpdateCoffeeDto) {
    this.logger.log(
      `Delete coffee invoked to delete coffee with id: ${coffeeId}`,
    );
    const updatedCoffeeEntity = await this.coffeeRepository.preload({
      id: +coffeeId,
      ...updateCoffeeDto,
    });
    if (!updatedCoffeeEntity) {
      throw new NotFoundException(`Coffee #${coffeeId} not found`);
    }
    return this.coffeeRepository.save(updatedCoffeeEntity);
  }

  async remove(coffeeId: string) {
    const coffeeToDelete = await this.findById(coffeeId);
    return this.coffeeRepository.remove(coffeeToDelete);
  }
}
