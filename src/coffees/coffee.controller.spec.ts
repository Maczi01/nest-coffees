import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';

describe('CoffeesController', () => {
  let controller: CoffeesController;
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeesController],
      providers: [
        CoffeesService,
        {
          provide: getRepositoryToken(Coffee),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CoffeesController>(CoffeesController);
    service = module.get<CoffeesService>(CoffeesService);
  });

  describe('findAll', () => {
    it('should return an array of coffees', async () => {
      const result: Coffee[] = [
        { id: 1, name: 'Coffee 1', brand: 'Tschiboo', flavors: ['vanilla'] },
        { id: 2, name: 'Coffee 2', brand: 'Mokate', flavors: ['bitter'] },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll({})).toBe(result);
    });
  });

  describe('findById', () => {
    it('should return a coffee by ID', async () => {
      const result = {
        id: 1,
        name: 'Coffee 1',
        brand: 'Tschiboo',
        flavors: ['vanilla'],
      };
      const coffeeId = '1';
      jest.spyOn(service, 'findById').mockResolvedValue(result);

      expect(await controller.findById(coffeeId)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new coffee', async () => {
      const result = {
        id: 1,
        name: 'Coffee 1',
        brand: 'Tschiboo',
        flavors: ['vanilla'],
      };
      const createCoffeeDto = {
        name: 'Coffee',
        brand: 'Tschiboo',
        flavors: ['vanilla'],
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createCoffeeDto)).toBe(result);
    });
  });

  // describe('updateCoffee', () => {
  //   it('should update a coffee', async () => {
  //     const result = 'updated coffee';
  //     const id = 1;
  //     const updateCoffeeDto = { name: 'Updated Coffee' };
  //     jest.spyOn(service, 'update').mockResolvedValue(result);
  //
  //     expect(await controller.updateCoffee(id, updateCoffeeDto)).toBe(result);
  //   });
  // });

  // describe('removeCoffee', () => {
  //   it('should remove a coffee', async () => {
  //     const result = 'removed coffee';
  //     const id = '1';
  //     jest.spyOn(service, 'remove').mockResolvedValue(result);
  //
  //     expect(await controller.removeCoffee(id)).toBe(result);
  //   });
  // });
});
