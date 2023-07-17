import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/create-coffee.dto/update-coffee.dto';

describe('CoffeesService', () => {
  let service: CoffeesService;
  let repository: Repository<Coffee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        {
          provide: getRepositoryToken(Coffee),

          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    repository = module.get<Repository<Coffee>>(getRepositoryToken(Coffee));
  });

  describe('findAll', () => {
    it('should return an array of coffees', async () => {
      const result: Coffee[] = [
        {
          id: 1,
          name: 'Coffee 1',
          brand: 'Tschiboo',
          flavors: [{ id: 1, name: 'vanilla' }],
        },
        { id: 2, name: 'Coffee 2', brand: 'Mokate', flavors: ['bitter'] },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findById', () => {
    it('should return a coffee by ID', async () => {
      const result: Coffee = {
        id: 1,
        name: 'Coffee 1',
        brand: 'Mokate',
        flavors: ['bitter'],
      };
      const coffeeId = '1';
      jest.spyOn(repository, 'findOne').mockResolvedValue(result);

      expect(await service.findById(coffeeId)).toBe(result);
    });

    it('should throw NotFoundException when coffee is not found', async () => {
      const coffeeId = '999';
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.findById(coffeeId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
  describe('create', () => {
    it('should create a new coffee', async () => {
      const result = {
        id: 1,
        name: 'Coffee 1',
        brand: 'Mokate',
        flavors: ['bitter'],
      };
      const createCoffeeDto: CreateCoffeeDto = {
        name: 'Coffee 1',
        brand: 'Mokate',
        flavors: ['bitter'],
      };
      jest
        .spyOn(repository, 'create')
        .mockReturnValue({ id: 1, ...createCoffeeDto });
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue({ id: 1, ...createCoffeeDto });

      expect(await service.create(createCoffeeDto)).toStrictEqual(result);
    });
  });

  // describe('update', () => {
  //   it('should update a coffee', async () => {
  //     const result = {
  //       name: 'Updated Coffee',
  //       brand: 'Updated Brand',
  //       flavors: ['bitter'],
  //     };
  //     const coffeeId = 1;
  //     const updateCoffeeDto: UpdateCoffeeDto = {
  //       name: 'Updated Coffee',
  //       brand: 'Updated Brand',
  //       flavors: ['bitter'],
  //     };
  //     const coffeeEntity = { id: coffeeId, ...updateCoffeeDto };
  //     jest.spyOn(repository, 'preload').mockResolvedValue(coffeeEntity);
  //     jest.spyOn(repository, 'save').mockResolvedValue({ id: 1, ...updateCoffeeDto });
  //
  //     expect(await service.update(coffeeId, updateCoffeeDto)).toBe(result);
  //   });
  //
  //   it('should throw NotFoundException when coffee is not found', async () => {
  //     const coffeeId = 999;
  //     const updateCoffeeDto: UpdateCoffeeDto = { name: 'Updated Coffee' };
  //     jest.spyOn(repository, 'preload').mockResolvedValue(undefined);
  //
  //     await expect(service.update(coffeeId, updateCoffeeDto)).rejects.toThrow(
  //       NotFoundException,
  //     );
  //   });
  // });
  //
  // describe('remove', () => {
  //   it('should remove a coffee', async () => {
  //     const coffeeId = '1';
  //     const coffeeEntity = { id: coffeeId };
  //     jest.spyOn(service, 'findById').mockResolvedValue(coffeeEntity);
  //     jest.spyOn(repository, 'remove').mockResolvedValue(coffeeEntity);
  //
  //     expect(await service.remove(coffeeId)).toBe(coffeeEntity);
  //   });
  //
  //   it('should throw NotFoundException when coffee is not found', async () => {
  //     const coffeeId = '999';
  //     jest.spyOn(service, 'findById').mockRejectedValue(NotFoundException);
  //
  //     await expect(service.remove(coffeeId)).rejects.toThrow(NotFoundException);
  //   });
  // });
});
