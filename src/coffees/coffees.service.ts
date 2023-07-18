import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/create-coffee.dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Flavor } from './entities/flavor.entity';
import { PaginationQuery } from '../common/dto/pagination-query/pagination-query';
import { Event } from '../events/entities/event.entity/event.entity';

@Injectable()
export class CoffeesService {
  private readonly logger = new Logger(CoffeesService.name);

  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly dataSource: DataSource,
  ) {}

  findAll(paginationQuery: PaginationQuery) {
    this.logger.log('Find all called');
    const { limit, offset } = paginationQuery;
    return this.coffeeRepository.find({
      relations: { flavors: true },
      skip: offset,
      take: limit,
    });
  }

  async findById(coffeeId: string) {
    this.logger.log(`Get item with id ${coffeeId}`);
    const coffee = await this.coffeeRepository.findOne({
      where: { id: +coffeeId },
      relations: { flavors: true },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${coffeeId} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    this.logger.log(
      `Create coffee invoked to add coffee with name ${createCoffeeDto.name}`,
    );
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorsByName(name)),
    );

    const createdCoffeeEntity = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(createdCoffeeEntity);
  }

  async update(coffeeId: number, updateCoffeeDto: UpdateCoffeeDto) {
    this.logger.log(
      `Delete coffee invoked to delete coffee with id: ${coffeeId}`,
    );
    const flavors = await Promise.all(
      updateCoffeeDto.flavors.map((name) => this.preloadFlavorsByName(name)),
    );
    const updatedCoffeeEntity = await this.coffeeRepository.preload({
      id: +coffeeId,
      ...updateCoffeeDto,
      flavors,
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

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      coffee.recommendations++;
      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadFlavorsByName(name: string): Promise<Flavor> {
    const existingFlavors = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavors) {
      return existingFlavors;
    }
    return this.flavorRepository.create({ name });
  }
}
